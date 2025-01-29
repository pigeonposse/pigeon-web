<script lang="ts">

    import { tick } from 'svelte';
  
    export let texts: string[] = [];
    export let speed = 100; // Velocidad en milisegundos para escribir cada carácter
    export let delay = 2000; // Retardo entre textos
  
    let displayText = '';
    let index = 0;
    let textIndex = 0;
  
    async function typeWriterEffect() {
      while (true) {
        if (index < texts[textIndex].length) {
          displayText += texts[textIndex][index];
          index += 1;
          await tick();
          await new Promise(r => setTimeout(r, speed));
        } else {
          await new Promise(r => setTimeout(r, delay));
          index = 0;
          displayText = '';
          textIndex = (textIndex + 1) % texts.length;
        }
      }
    }
  
	typeWriterEffect();
  </script>
  
<span {...$$restProps}>{displayText}</span>
  