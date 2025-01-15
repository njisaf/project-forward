<script>
  import { ApplicationShell } from '#runtime/svelte/component/application';
  
  // ApplicationShell Contract
  export let elementRoot;
  
  // Character Data
  export let actor;
</script>

<svelte:options accessors={true}/>

<ApplicationShell bind:elementRoot>
  <main class="character-sheet">
    <header>
      <h1>{actor.characterName}</h1>
      <div class="level">Level {actor.level}</div>
    </header>
    
    <section class="attributes">
      <h2>Attributes</h2>
      {#each Object.entries(actor.attributes) as [name, value]}
        <div class="attribute">
          <label>{name}</label>
          <input type="number" bind:value={actor.attributes[name]} min="1" />
        </div>
      {/each}
    </section>
    
    <section class="health">
      <h2>Health</h2>
      <div class="health-controls">
        <label>Current</label>
        <input type="number" bind:value={actor.health.current} />
        <label>Maximum</label>
        <input type="number" bind:value={actor.health.max} />
      </div>
    </section>
    
    <section class="skills">
      <h2>Skills</h2>
      {#each Object.entries(actor.skills) as [name, value]}
        <div class="skill">
          <label>{name}</label>
          <input type="number" bind:value={actor.skills[name]} />
        </div>
      {/each}
    </section>
  </main>
</ApplicationShell>

<style lang="scss">
  .character-sheet {
    padding: 1rem;
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      
      h1 {
        margin: 0;
        color: var(--pf-primary-color);
      }
    }
    
    section {
      margin-bottom: 1.5rem;
      
      h2 {
        color: var(--pf-primary-color);
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      }
    }
    
    .attribute, .skill {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      
      label {
        text-transform: capitalize;
      }
    }
    
    .health-controls {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.5rem;
      align-items: center;
    }
    
    input {
      width: 60px;
      padding: 0.25rem;
      border: 1px solid #ccc;
      border-radius: 3px;
      
      &:focus {
        outline: 2px solid var(--pf-primary-color);
        border-color: var(--pf-primary-color);
      }
    }
  }
</style>
