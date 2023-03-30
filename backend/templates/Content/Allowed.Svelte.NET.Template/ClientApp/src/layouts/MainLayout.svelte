<script>
    import {fireImg, rocketImg} from "../assets/img";
    import Header from "../components/shared/Header.svelte";
</script>

<div class="wrapper">
    
    <div class="wrapper__bg">
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
    </div>
    
    <div class="wrapper__rocket">
        <div class="rocket">
            <div class="rocket__main">
                <img src={rocketImg} alt="">
            </div>
            <div class="rocket__fire">
                <img src={fireImg} alt="">
            </div>
        </div>
    </div>
    
    <div class="wrapper__content">
        <Header/>
        <slot/>
    </div>
</div>