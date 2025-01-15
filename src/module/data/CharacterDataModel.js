/**
 * @class CharacterDataModel
 * @extends foundry.abstract.DataModel
 * @description Character data model for Project Forward
 */
export class CharacterDataModel extends foundry.abstract.DataModel {
  /** @override */
  static defineSchema() {
    const fields = foundry.data.fields;
    
    return {
      characterName: new fields.StringField({
        required: true,
        initial: "New Character"
      }),
      
      level: new fields.NumberField({
        required: true,
        initial: 1,
        min: 1,
        integer: true
      }),
      
      attributes: new fields.SchemaField({
        strength: new fields.NumberField({ required: true, initial: 10, min: 1 }),
        dexterity: new fields.NumberField({ required: true, initial: 10, min: 1 }),
        constitution: new fields.NumberField({ required: true, initial: 10, min: 1 }),
        intelligence: new fields.NumberField({ required: true, initial: 10, min: 1 }),
        wisdom: new fields.NumberField({ required: true, initial: 10, min: 1 }),
        charisma: new fields.NumberField({ required: true, initial: 10, min: 1 })
      }),
      
      skills: new fields.SchemaField({
        acrobatics: new fields.NumberField({ required: true, initial: 0 }),
        athletics: new fields.NumberField({ required: true, initial: 0 }),
        deception: new fields.NumberField({ required: true, initial: 0 }),
        insight: new fields.NumberField({ required: true, initial: 0 }),
        intimidation: new fields.NumberField({ required: true, initial: 0 }),
        investigation: new fields.NumberField({ required: true, initial: 0 })
      }),
      
      health: new fields.SchemaField({
        current: new fields.NumberField({ required: true, initial: 10 }),
        max: new fields.NumberField({ required: true, initial: 10 })
      }),
      
      actionPoints: new fields.NumberField({
        required: true,
        initial: 3,
        min: 0
      })
    };
  }
}
