<script lang="ts">
    import { onMount, onDestroy, type ComponentProps } from "svelte";
    import Card from "$lib/components/card/project.svelte";
    import CardMain from "$lib/components/card/main.svelte";
    import './feat.css'

    export let values: (ComponentProps<Card>)[] = [];
    export let autoPlay = false;
    export let autoPlayInterval = 5000; // Intervalo en milisegundos

    let currentIndex = 0;
    let totalCards = values.length;
    let hover = false;
    let timer: NodeJS.Timeout;
    let prevIndex = totalCards - 1;
    let nextIndex = (currentIndex + 1) % totalCards;

    const updateIndices = () => {
        prevIndex = currentIndex === 0 ? totalCards - 1 : currentIndex - 1;
        nextIndex = (currentIndex + 1) % totalCards;
    };

    const next = () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateIndices();
    };

    const prev = () => {
        currentIndex = currentIndex === 0 ? totalCards - 1 : currentIndex - 1;
        updateIndices();
    };

    const startAutoPlay = () => {
        if (autoPlay && !hover) {
            timer = setInterval(next, autoPlayInterval);
        }
    };

    const stopAutoPlay = () => {
        clearInterval(timer);
    };

    onMount(() => {
        updateIndices();
        // startAutoPlay();
    });

    onDestroy(() => {
        // stopAutoPlay();
    })
    
</script>

<div
    class="carousel_feat"
    role="presentation"
    on:mouseenter={() => hover = true}
    on:mouseleave={() => {hover = false; startAutoPlay()}}
>
    <CardMain 
        on:click={prev} 
        type="global"
        imgBgUrl={values[prevIndex].img}
        class="carousel_feat__next_prev"
        tooltip={{
            title:values[prevIndex].title,
            placement:"right",
            class: "carousel_feat__next_prev__tooltip"
        }}
    >
        <img 
            src={values[prevIndex].img} 
            alt="Previous" 
            class="carousel_feat__next_prev__img"
        />
    </CardMain>

    <div class="carousel_feat__content">
        {#each values as card, i }
            <Card 
                {...card} 
                class="carousel_feat__content__card {`${i === currentIndex ? '' : '!hidden'}`}"
            />
        {/each}
    </div>

    <CardMain 
        on:click={next} 
        type="global"
        imgBgUrl={values[nextIndex].img}
        class="carousel_feat__next_prev"
        tooltip={{
            title:values[nextIndex].title,
            placement:"left",
            class: "carousel_feat__next_prev__tooltip"
        }}
        
    >
        <img 
            src={values[nextIndex].img} 
            alt="Next" 
            class="carousel_feat__next_prev__img"
        />
    </CardMain>
</div>
