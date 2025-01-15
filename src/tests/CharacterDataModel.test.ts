import { describe, it, expect, beforeAll } from 'vitest';
import type { CharacterData } from '../types/character';

// Type definitions for mock implementation
type PrimitiveType = string | number;

interface BaseSchemaField {
  type: typeof String | typeof Number | typeof Object;
  required?: boolean;
  nullable?: boolean;
}

interface PrimitiveSchemaField extends BaseSchemaField {
  type: typeof String | typeof Number;
  initial?: PrimitiveType;
  min?: number;
}

interface ObjectSchemaField<T> extends BaseSchemaField {
  type: typeof Object;
  initial?: T;
  fields: {
    [K in keyof T]: PrimitiveSchemaField;
  };
}

type ValidateNestedObject<T> = T extends object ? T : never;

type InferSchemaType<T> = T extends PrimitiveSchemaField
  ? ReturnType<T['type']>
  : T extends ObjectSchemaField<infer U>
  ? U
  : never;

type SchemaField<T> = T extends Record<string, any>
  ? ObjectSchemaField<T>
  : PrimitiveSchemaField;

type Schema = {
  [K in keyof CharacterData]: SchemaField<CharacterData[K]>;
};

type TypedSchema<T> = {
  [K in keyof T]: SchemaField<T[K]>;
};

describe('CharacterDataModel', () => {
  let CharacterDataModel: any;

  // Create mock foundry implementation
  class MockDataModel {
    protected _source: Required<CharacterData>;

    static defineSchema(): Schema {
      return {
        characterName: {
          type: String,
          required: true,
          nullable: false,
          initial: 'New Character'
        },
        level: {
          type: Number,
          required: true,
          nullable: false,
          initial: 1,
          min: 1
        },
        attributes: {
          type: Object,
          required: true,
          initial: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10
          },
          fields: {
            strength: { type: Number, required: true, min: 1 },
            dexterity: { type: Number, required: true, min: 1 },
            constitution: { type: Number, required: true, min: 1 },
            intelligence: { type: Number, required: true, min: 1 },
            wisdom: { type: Number, required: true, min: 1 },
            charisma: { type: Number, required: true, min: 1 }
          }
        },
        skills: {
          type: Object,
          required: true,
          initial: {
            acrobatics: 0,
            athletics: 0,
            deception: 0,
            insight: 0,
            intimidation: 0,
            investigation: 0
          },
          fields: {
            acrobatics: { type: Number },
            athletics: { type: Number },
            deception: { type: Number },
            insight: { type: Number },
            intimidation: { type: Number },
            investigation: { type: Number }
          }
        },
        health: {
          type: Object,
          required: true,
          initial: {
            current: 10,
            max: 10
          },
          fields: {
            current: { type: Number, required: true },
            max: { type: Number, required: true }
          }
        },
        actionPoints: {
          type: Number,
          required: true,
          initial: 3,
          min: 0
        }
      };
    }

      constructor(data: Partial<CharacterData> = {}) {
        const schema = (this.constructor as typeof MockDataModel).defineSchema();
        
        // Initialize with schema defaults
        this._source = Object.entries(schema).reduce<Required<CharacterData>>((acc, [key, field]) => {
          const k = key as keyof CharacterData;
          
          if (field.type === Object && 'fields' in field) {
            // Handle nested objects
            type NestedType = ValidateNestedObject<CharacterData[typeof k]>;
            const objectField = field as ObjectSchemaField<NestedType>;
            
            // Initialize with defaults
            const defaultValues = objectField.initial ?? {};
            const providedValues = (data[k] ?? {}) as Partial<NestedType>;
            
            // Merge values with type safety
            const mergedValues = Object.entries(objectField.fields).reduce<NestedType>((obj, [key, schema]) => {
              const typedKey = key as keyof NestedType;
              const value = providedValues[typedKey] ?? defaultValues[typedKey] ?? schema.initial;
              
              // Validate value
              if (schema.required && value === undefined) {
                throw new Error(`${k}.${key} is required`);
              }
              if (schema.min !== undefined && typeof value === 'number' && value < schema.min) {
                throw new Error(`${k}.${key} must be at least ${schema.min}`);
              }
              
              obj[typedKey] = value as NestedType[typeof typedKey];
              return obj;
            }, {} as NestedType);
            
            // Validate object as a whole
            if (objectField.required && Object.keys(mergedValues).length === 0) {
              throw new Error(`${key} is required`);
            }
            
            (acc as Record<keyof CharacterData, any>)[k] = mergedValues;
          } else {
            // Handle primitive fields
            const primitiveField = field as PrimitiveSchemaField;
            const value = data[k] ?? primitiveField.initial;
            
            // Type-safe validation for primitives
            if (primitiveField.required && value === undefined) {
              throw new Error(`${key} is required`);
            }
            if (primitiveField.min !== undefined && typeof value === 'number' && value < primitiveField.min) {
              throw new Error(`${key} must be at least ${primitiveField.min}`);
            }
            if (k === 'characterName' && typeof value === 'string' && !value.trim()) {
              throw new Error('Character name cannot be empty');
            }
            
            acc[k] = value as CharacterData[typeof k];
          }
          
          return acc;
        }, {} as Required<CharacterData>);
      }

      get characterName() { return this._source.characterName; }
      set characterName(value: string) {
        if (!value?.trim()) throw new Error('Character name cannot be empty');
        this._source.characterName = value.trim();
      }

      get level() { return this._source.level; }
      set level(value: number) {
        if (value < 1) throw new Error('Level must be at least 1');
        this._source.level = value;
      }

      get attributes() { return this._source.attributes; }
      get skills() { return this._source.skills; }
      get health() { return this._source.health; }

      get actionPoints() { return this._source.actionPoints; }
      set actionPoints(value: number) {
        if (value < 0) throw new Error('Action points cannot be negative');
        this._source.actionPoints = value;
      }

  }

  const mockFoundry = {
    abstract: {
      DataModel: MockDataModel
    },
    data: {
      fields: {
        StringField: (config: any) => ({ 
          type: String, 
          required: config?.required, 
          nullable: config?.nullable, 
          initial: config?.initial 
        }),
        NumberField: (config: any) => ({ 
          type: Number, 
          required: config?.required, 
          nullable: config?.nullable, 
          initial: config?.initial,
          min: config?.min 
        }),
        SchemaField: (config: any) => ({ 
          type: Object, 
          fields: config?.fields, 
          required: config?.required, 
          initial: config?.initial 
        })
      }
    },
    utils: {
      mergeObject: (original: any, other: any) => {
        if (!other || typeof other !== 'object') return original;
        const result = { ...original };
        Object.entries(other).forEach(([key, value]) => {
          if (value === undefined) return;
          const target = result[key];
          if (value && typeof value === 'object' && !Array.isArray(value) && target && typeof target === 'object') {
            result[key] = { ...target, ...value };
          } else if (value !== undefined) {
            result[key] = value;
          }
        });
        return result;
      }
    }
  };

  beforeAll(async () => {
    (globalThis as any).foundry = mockFoundry;
    const module = await import('../module/data/CharacterDataModel');
    CharacterDataModel = module.CharacterDataModel;
  });
  it('should initialize with default values', () => {
    const model = new CharacterDataModel({});
    expect(model.characterName).toBe('New Character');
    expect(model.level).toBe(1);
    expect(model.actionPoints).toBe(3);
  });

  it('should accept custom values', () => {
    const model = new CharacterDataModel({
      characterName: 'Custom Hero',
      level: 5,
      actionPoints: 5
    });
    expect(model.characterName).toBe('Custom Hero');
    expect(model.level).toBe(5);
    expect(model.actionPoints).toBe(5);
  });

  it('should validate required fields and ranges', () => {
    const model = new CharacterDataModel({});
    
    expect(() => {
      model.characterName = '';
    }).toThrow();
    
    expect(() => {
      model.level = 0;
    }).toThrow();
    
    expect(() => {
      model.actionPoints = -1;
    }).toThrow();
  });
});
