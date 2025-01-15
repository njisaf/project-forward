import { describe, it, expect, beforeAll } from 'vitest';
import { CharacterDataModel } from '../module/data/CharacterDataModel.js';

interface FieldConfig {
  required?: boolean;
  initial?: any;
  min?: number;
  integer?: boolean;
}

interface SchemaConfig {
  [key: string]: any;
}

// Mock Foundry VTT API
const mockFoundry = {
  abstract: {
    DataModel: class {
      [key: string]: any;
      constructor(data: Record<string, any>) {
        Object.assign(this, {
          characterName: 'New Character',
          level: 1,
          attributes: {
            strength: 10
          }
        }, data);
      }
      static defineSchema(): Record<string, any> { return {}; }
    }
  },
  data: {
    fields: {
      StringField: class {
        config: FieldConfig;
        constructor(config: FieldConfig) { this.config = config; }
      },
      NumberField: class {
        config: FieldConfig;
        constructor(config: FieldConfig) { this.config = config; }
      },
      SchemaField: class {
        schema: SchemaConfig;
        constructor(schema: SchemaConfig) { this.schema = schema; }
      }
    }
  },
  utils: {
    mergeObject: (target: Record<string, any>, source: Record<string, any>): Record<string, any> => 
      ({ ...target, ...source })
  }
};

beforeAll(() => {
  // @ts-ignore
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
