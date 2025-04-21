declare global {
  type SiblingTable = {
    schemaName: string;
    name: string;
    fields: {
      id: string;
      name: string;
      type: string;
    }[];
  };

  interface RefEndpoint {
    schema: string;
    table: string;
    fieldNames: string[];
    relation: string;
  }

  type EnumValueResponse = {
    id: string;
    name: string;
    note: string;
  };

  type EnumResponse = {
    name: string;
    values: EnumValueResponse[];
  };

  type RefResponse = {
    id: string;
    name: string;
    from: RefEndpoint;
    to: RefEndpoint;
    refDef: string;
  };

  type FieldResponse = {
    name: string;
    type: string;
    pk?: boolean;
    fk?: boolean;
    note?: string;
    not_null?: boolean;
    unique?: string;
    fieldDefault?: {
      value: string;
      type: string;
    };
  };

  type TableResponse = {
    name: string;
    alias?: string;
    note?: string;
    refs?: RefResponse[];
    fields?: FieldResponse[];
  };

  type SchemaResponse = {
    name: string;
    note?: string;
    alias?: string;
    tables?: TableResponse[];
    enums?: EnumResponse[];
    refs?: RefResponse[];
  };

  interface DBMLResponse {
    name?: string;
    note?: string;
    databaseType?: string;
    schemas: SchemaResponse;
  }

  interface Token {
    i: number;
    x: number;
    y: number;
    text: string;
    style: Style;
  }

  interface Style {
    color: string;
    weight: string;
  }

  interface Message {
    type: 'response-editor' | 'error' | 'status';
    width?: number;
    height?: number;
    text: string;
    dbml: string | null;
    parsedDbml?: any;
    dbmlError: string | null;
    tokens?: Token[];
    language: string;
    parser: string;
    buttonAction?: 'update' | 'batch_create' | 'ref-create';
  }
}

export {};
