"use strict"

const skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g

const acorn = require("acorn")
const tt = acorn.tokTypes
const TokenType = acorn.TokenType

function maybeParseFieldValue(field) {
  if (this.eat(tt.eq)) {
    const oldInFieldValue = this._inFieldValue
    this._inFieldValue = true
    field.value = this.parseExpression()
    this._inFieldValue = oldInFieldValue
  } else field.value = null
}

function parsePrivateName() {
  const node = this.startNode()
  node.name = this.value
  this.next()
  this.finishNode(node, "PrivateName")
  if (this.options.allowReserved == "never") this.checkUnreserved(node)
  return node
}

const privateNameToken = new TokenType("privateName")

module.exports = function(Parser) {
  return class extends Parser {
    // Parse # token
    getTokenFromCode(code) {
      if (code === 35) {
        ++this.pos
        const word = this.readWord1()
        return this.finishToken(privateNameToken, word)
      }
      return super.getTokenFromCode(code)
    }

    // Manage stacks and check for undeclared private names
    parseClass(node, isStatement) {
      this._privateBoundNamesStack = this._privateBoundNamesStack || []
      const privateBoundNames = Object.create(this._privateBoundNamesStack[this._privateBoundNamesStack.length - 1] || null)
      this._privateBoundNamesStack.push(privateBoundNames)
      this._unresolvedPrivateNamesStack = this._unresolvedPrivateNamesStack || []
      const unresolvedPrivateNames = Object.create(null)
      this._unresolvedPrivateNamesStack.push(unresolvedPrivateNames)
      const _return = super.parseClass(node, isStatement)
      this._privateBoundNamesStack.pop()
      this._unresolvedPrivateNamesStack.pop()
      if (!this._unresolvedPrivateNamesStack.length) {
        const names = Object.keys(unresolvedPrivateNames)
        if (names.length) {
          names.sort((n1, n2) => unresolvedPrivateNames[n1] - unresolvedPrivateNames[n2])
          this.raise(unresolvedPrivateNames[names[0]], "Usage of undeclared private name")
        }
      } else Object.assign(this._unresolvedPrivateNamesStack[this._unresolvedPrivateNamesStack.length - 1], unresolvedPrivateNames)
      return _return
    }

    // Parse private fields
    parseClassElement(_constructorAllowsSuper) {
      if (this.eat(tt.semi)) return null
      const node = this.startNode()
      if (!(this.options.ecmaVersion >= 8) || this.type != privateNameToken) {
        // Special-case for `async`, since `parseClassMember` currently looks
        // for `(` to determine whether `async` is a method name
        if (this.isContextual("async")) {
          skipWhiteSpace.lastIndex = this.pos
          let skip = skipWhiteSpace.exec(this.input)
          let next = this.input.charAt(this.pos + skip[0].length)
          if (next === ";" || next === "=") {
            node.key = this.parseIdent(true)
            node.computed = false
            maybeParseFieldValue.call(this, node)
            this.finishNode(node, "FieldDefinition")
            this.semicolon()
            return node
          }
        }
        return super.parseClassElement.apply(this, arguments)
      }
      node.key = parsePrivateName.call(this)
      node.computed = false
      if (node.key.name == "constructor") this.raise(node.start, "Classes may not have a field named constructor")
      if (Object.prototype.hasOwnProperty.call(this._privateBoundNamesStack[this._privateBoundNamesStack.length - 1], node.key.name)) this.raise(node.start, "Duplicate private element")
      this._privateBoundNamesStack[this._privateBoundNamesStack.length - 1][node.key.name] = true
      delete this._unresolvedPrivateNamesStack[this._unresolvedPrivateNamesStack.length - 1][node.key.name]
      maybeParseFieldValue.call(this, node)
      this.finishNode(node, "FieldDefinition")
      this.semicolon()
      return node
    }

    // Parse public fields
    parseClassMethod(method, isGenerator, isAsync, _allowsDirectSuper) {
      if (isGenerator || isAsync || method.kind != "method" || method.static || this.options.ecmaVersion < 8 || this.type == tt.parenL) {
        return super.parseClassMethod.apply(this, arguments)
      }
      maybeParseFieldValue.call(this, method)
      delete method.kind
      delete method.static
      method = this.finishNode(method, "FieldDefinition")
      this.semicolon()
      return method
    }

    // Parse private element access
    parseSubscripts(base, startPos, startLoc, noCalls) {
      for (let computed; ;) {
        if ((computed = this.eat(tt.bracketL)) || this.eat(tt.dot)) {
          let node = this.startNodeAt(startPos, startLoc)
          node.object = base
          if (computed) {
            node.property = this.parseExpression()
          } else if (this.type == privateNameToken) {
            node.property = parsePrivateName.call(this)
            if (!this._privateBoundNamesStack.length || !this._privateBoundNamesStack[this._privateBoundNamesStack.length - 1][node.property.name]) {
              this._unresolvedPrivateNamesStack[this._unresolvedPrivateNamesStack.length - 1][node.property.name] = node.property.start
            }
          } else {
            node.property = this.parseIdent(true)
          }
          node.computed = Boolean(computed)
          if (computed) this.expect(tt.bracketR)
          base = this.finishNode(node, "MemberExpression")
        } else {
          return super.parseSubscripts(base, startPos, startLoc, noCalls)
        }
      }
    }

    // Prohibit delete of private class elements
    parseMaybeUnary(refDestructuringErrors, sawUnary) {
      const _return = super.parseMaybeUnary(refDestructuringErrors, sawUnary)
      if (_return.operator == "delete") {
        if (_return.argument.type == "MemberExpression" && _return.argument.property.type == "PrivateName") {
          this.raise(_return.start, "Private elements may not be deleted")
        }
      }
      return _return
    }

    // Prohibit arguments in class field initializers
    parseIdent(liberal, isBinding) {
      const ident = super.parseIdent(liberal, isBinding)
      if (this._inFieldValue && ident.name == "arguments") this.raise(ident.start, "A class field initializer may not contain arguments")
      return ident
    }

    // Prohibit super in class field initializers
    // FIXME: This is not necessary in acorn >= 6.0.3
    parseExprAtom(refDestructuringErrors) {
      const atom = super.parseExprAtom(refDestructuringErrors)
      if (this._inFieldValue && atom.type == "Super") this.raise(atom.start, "A class field initializer may not contain super")
      return atom
    }
  }
}
