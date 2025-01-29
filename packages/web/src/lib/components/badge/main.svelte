<script lang="ts">
    
    import './style.css'
    export let type: "purple" | "red" | "green" | "blue" | "yellow" | "gray" | "primary" | "secondary" = "primary"

</script>

<span 
    {...$$restProps} 
    class="badge {type} {$$restProps.class || ''}"
>
    <slot/>
</span>