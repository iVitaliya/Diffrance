// -----------------------------------------------------------
// --------------          AST TYPES        ------------------
// ---     Defines the structure of our languages AST      ---
// -----------------------------------------------------------
export type NodeType =
    // STATEMENTS
    | "Program"
    | "VarDeclaration"
    | "FuncDeclaration"
    | "IfStatement"
    | "ForStatement"
    | "TryCatchStatement"

    // EXPRESSIONS
    | "AssignmentExpr"
    | "MemberExpr"
    | "CallExpr"

    // LITERALS
    | "Property"
    | "ObjectLiteral"
    | "NumbericLiteral"
    | "Identifier"
    | "StringLiteral"
    | "BinaryExpr";

/**
 * Statements do not result in a value at runtime.
 They contain one or more expressions internally */
export interface Statement {
    kind: NodeType;
}

/**
 * Defines a block which contains many statements.
 * -  Only one program will be contained in a file. */
export interface Program extends Statement {
    kind: "Program";
    body: Statement[];
}

export interface VariableDeclaration extends Statement {
    kind: "VarDeclaration";
    constant: boolean;
    identifier: string;
    value?: Expression;
}

export interface IfStatement extends Statement {
    kind: "IfStatement";
    test: Expression;
    body: Statement[];
    alternate?: Statement[];
}

export interface TryCatchStatement extends Statement {
    kind: "TryCatchStatement";
    body: Statement[];
    alternate: Statement[];
}

export interface FunctionDeclaration extends Statement {
    kind: "FuncDeclaration";
    parameters: string[];
    name: string;
    body: Statement[];
}

export interface ForStatement extends Statement {
    kind: "ForStatement";
    init: VariableDeclaration;
    test: Expression;
    update: AssignmentExpression;
    body: Statement[];
}

/**  Expressions will result in a value at runtime unlike Statements */
// deno-lint-ignore no-empty-interface
export interface Expression extends Statement { }

/**
 * A operation with two sides seperated by a operator.
 * Both sides can be ANY Complex Expression.
 * - Supported Operators -> `+` | `-` | `/` | `*` | `%` */
export interface BinaryExpression extends Expression {
    kind: "BinaryExpr";
    left: Expression;
    right: Expression;
    operator: string; // Needs to be of type BinaryOperator.
}

// foo.bar()
// foo["bar"]()

export interface CallExpression extends Expression {
    kind: "CallExpr";
    args: Expression[];
    caller: Expression;
}

export interface MemberExpression extends Expression {
    kind: "MemberExpr";
    object: Expression;
    property: Expression;
    computed: boolean;
}

export interface AssignmentExpression extends Expression {
    kind: "AssignmentExpr";
    assigne: Expression;
    value: Expression;
}

// LITERAL / PRIMARY EXPRESSION TYPES
/** Represents a user-defined variable or symbol in source. */
export interface Identifier extends Expression {
    kind: "Identifier";
    symbol: string;
}

/** Represents a numeric constant inside the soure code. */
export interface NumbericLiteral extends Expression {
    kind: "NumbericLiteral";
    value: number;
}

/** Represents a string constant inside the soure code. */
export interface StringLiteral extends Expression {
    kind: "StringLiteral";
    value: string;
}

export interface Property extends Expression {
    kind: "Property";
    key: string;
    value?: Expression;
}

export interface ObjectLiteral extends Expression {
    kind: "ObjectLiteral";
    properties: Property[];
}