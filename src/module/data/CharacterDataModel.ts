import type { CharacterAttributes, CharacterSkills, CharacterHealth, CharacterSchema, CharacterDocument, CharacterData } from '../../types/character';
// We'll define these constants here since we can't import them directly from the types package
const REQUIRED_STRING = {
  type: String,
  required: true,
  nullable: false
};

const NUMERIC_FIELD = {
  type: Number,
  required: false,
  nullable: true
};

const OBJECT_FIELD = {
  type: Object,
  required: true,
  default: {}
};

/**
 * @class CharacterDataModel
 * @extends foundry.abstract.DocumentData
 * @description Character data model for Project Forward
 */
export class CharacterDataModel extends foundry.abstract.DataModel<CharacterSchema, CharacterData> implements CharacterDocument {
  characterName!: string;
  level!: number;
  attributes!: CharacterAttributes;
  skills!: CharacterSkills;
  health!: CharacterHealth;
  actionPoints!: number;

  /** @override */
  static defineSchema(): CharacterSchema {
    return {
      characterName: REQUIRED_STRING,
      
      level: NUMERIC_FIELD,
      
      attributes: {
        ...OBJECT_FIELD,
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
          strength: NUMERIC_FIELD,
          dexterity: NUMERIC_FIELD,
          constitution: NUMERIC_FIELD,
          intelligence: NUMERIC_FIELD,
          wisdom: NUMERIC_FIELD,
          charisma: NUMERIC_FIELD
        }
      },
      
      skills: {
        ...OBJECT_FIELD,
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
          acrobatics: NUMERIC_FIELD,
          athletics: NUMERIC_FIELD,
          deception: NUMERIC_FIELD,
          insight: NUMERIC_FIELD,
          intimidation: NUMERIC_FIELD,
          investigation: NUMERIC_FIELD
        }
      },
      
      health: {
        ...OBJECT_FIELD,
        required: true,
        initial: {
          current: 10,
          max: 10
        },
        fields: {
          current: NUMERIC_FIELD,
          max: NUMERIC_FIELD
        }
      },
      
      actionPoints: NUMERIC_FIELD
    };
  }
}
