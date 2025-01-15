import { describe, it, expect, beforeAll } from 'vitest';
import { CharacterDataModel } from '../module/data/CharacterDataModel.js';

interface FieldValue {
  required?: boolean;
  initial?: string | number;
  min?: number;
  integer?: boolean;
}

interface CharacterData {
  characterName?: string;
  level?: number;
  attributes?: {
    strength?: number;
    [key: string]: number | undefined;
  };
}

interface DataSchema {
  [key: string]: FieldValue | DataSchema;
}

// Mock Foundry VTT API
const mockFoundry = {
  abstract: {
    DataModel: class {
      characterName!: string;
      level!: number;
      attributes!: { strength: number };

      constructor(data: Partial<CharacterData> = {}) {
        const defaults = {
          characterName: 'New Character',
          level: 1,
          attributes: {
            strength: 10
          }
        };
        Object.assign(this, defaults, data);
      }

      static defineSchema(): DataSchema { return {}; }
    }
  },
  data: {
    fields: {
      StringField: class {
        config: FieldValue;
        constructor(config: FieldValue) { this.config = config; }
      },
      NumberField: class {
        config: FieldValue;
        constructor(config: FieldValue) { this.config = config; }
      },
      SchemaField: class {
        schema: DataSchema;
        constructor(schema: DataSchema) { this.schema = schema; }
      }
    }
  },
  utils: {
    mergeObject: <T extends object>(target: T, source: Partial<T>): T => 
      ({ ...target, ...source } as T)
  }
};

beforeAll(() => {
  // @ts-expect-error - Mock foundry global for testing
  global.foundry = mockFoundry;
});

describe('CharacterDataModel', () => {
  it('should initialize with default values', () => {
    const model = new CharacterDataModel({});
    expect(model.characterName).toBe('New Character');
    expect(model.level).toBe(1);
    expect(model.attributes.strength).toBe(10);
  });
});
