declare global {
  namespace foundry {
    namespace abstract {
      class DataModel<Schema extends object = any, Data extends object = any> {
        constructor(data?: Partial<Data>);
        static defineSchema(): object;
      }
    }
    namespace data {
      namespace fields {
        interface DataField<T> {
          type: StringConstructor | NumberConstructor | ObjectConstructor;
          required?: boolean;
          nullable?: boolean;
          initial?: T;
          default?: T;
          validate?: (value: T) => boolean;
          min?: number;
        }

        interface SchemaField<T> {
          type: ObjectConstructor;
          required?: boolean;
          nullable?: boolean;
          initial?: Partial<T>;
          default?: Partial<T>;
          fields: { [K in keyof T]: DataField<T[K]> };
        }
      }
    }
  }
}

export interface CharacterAttributes {
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
}

export interface CharacterSkills {
  acrobatics?: number;
  athletics?: number;
  deception?: number;
  insight?: number;
  intimidation?: number;
  investigation?: number;
}

export interface CharacterHealth {
  current?: number;
  max?: number;
}

export interface CharacterData {
  characterName?: string;
  level?: number;
  attributes?: CharacterAttributes;
  skills?: CharacterSkills;
  health?: CharacterHealth;
  actionPoints?: number;
}

export type CharacterSchema = {
  characterName: foundry.data.fields.DataField<string>;
  level: foundry.data.fields.DataField<number>;
  attributes: foundry.data.fields.SchemaField<CharacterAttributes>;
  skills: foundry.data.fields.SchemaField<CharacterSkills>;
  health: foundry.data.fields.SchemaField<CharacterHealth>;
  actionPoints: foundry.data.fields.DataField<number>;
}

export type CharacterDocument = InstanceType<typeof foundry.abstract.DataModel<CharacterSchema, CharacterData>>;
