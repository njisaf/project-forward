import { describe, it, expect } from 'vitest';
import { CharacterDataModel } from '../module/data/CharacterDataModel.js';

describe('CharacterDataModel', () => {
  it('should initialize with default values', () => {
    const model = new CharacterDataModel({});
    expect(model.characterName).toBe('New Character');
    expect(model.level).toBe(1);
    expect(model.attributes.strength).toBe(10);
  });
});
