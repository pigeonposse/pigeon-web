<script lang="ts">

    import { Tooltip } from 'flowbite-svelte'
    import './style.css'
    
    export let title: string 

</script>
  
<Tooltip defaultClass="tooltip" {...$$restProps}>{title}</Tooltip>