<template>
    <div class="circle-img">
    </div>
    <div class="circle-buttom">
    </div>
    <div class="circle-buttom-shadow">
    </div>
    <div class="contact-text contact-container">
        <div class=" row pt-5 text-center justify-content-center" style="color: white; gap: 20%; margin: 0px 0px;">
            <div class="col-lg-4 p-2 box-about">
                <div class="d-flex flex-column justify-content-center">
                    <h1>ABOUT</h1>
                    <p>"This website is a platform that displays information about Pokemon, created for educational purposes to demonstrate the usage of the Poke API.""</p>
                    <div class="d-flex flex-row justify-content-center  flex-wrap" style="gap: 10px;">
                        <div class="tool-container d-flex justify-content-center align-items-center" v-for="(tool, index) in tools" :key="index">
                            <img :src="tool.img_logo" alt="">
                        </div>       
                    </div>
                </div>
            </div>
            <div class="col-lg-4 p-2  box-about">
                <h1>CONTACT</h1>
                <form class="contact d-flex flex-column align-items-center justify-content-around" style="gap: 10px;" action="" @submit.prevent="sendEmail">
                    <input type="email" id="email" v-model="email" required placeholder="Email">
                    <input type="text" id="name" v-model="name" required placeholder="Name">
                    <input id="message" v-model="message" required placeholder="Message">
                    <button type="submit" class="btn-contact">CONTACT ME</button>
                </form>
            </div>
        </div>
    </div>
    <div style="width: 100%; height: 10vh; background-color: #28292A;">

    </div>
    <div class="d-flex justify-content-center align-items-center" style="width: 100%; height: 40vh; background-color: white;">
            <div class="d-flex flex-wrap flex-row social-container justify-content-center align-items-center">
                    <div class="social-circle" v-for="(social, index) in socials" :key="index">
                        <a :href="social.url_link" style="color: #28292A;" target="_blank"><i :class="social.icon"></i></a>
                    </div>
            </div>
    </div>
</template>
<script>
    export default {  
        data(){
            return{
                tools:{
                    tool_1:{
                        name:"VueJs",
                        img_logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png"
                    },
                    tool_2:{
                        name: "Axios",
                        img_logo: 'data:image/png;base64,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' 
                    },
                    tool_3:{
                        name:"PokeAPI",
                        img_logo:'https://pipedream.com/s.v0/app_mvNhzR/logo/orig'
                    }
                },
                socials:{
                    social_1:{
                        name:"facebook",
                        icon:"bi bi-facebook",
                        url_link:"https://www.facebook.com/profile.php?id=100090657341253",
                    },
                    social_2:{
                        name:"Youtube",
                        icon:"bi bi-youtube",
                        url_link:"https://www.youtube.com/",
                    },
                    social_3:{
                        name:"Instagram",
                        icon:"bi bi-instagram",
                        url_link:"https://www.instagram.com/",
                    },
                    social_4:{
                        name:"Twitch",
                        icon:"bi bi-twitch",
                        url_link:"https://www.twitch.tv/nuengphann",
                    },
                    social_5:{
                        name:"Github",
                        icon:"bi bi-github",
                        url_link:"https://github.com/JPhongphan",
                    },
                }
            }
        },
        methods: {
            sendEmail() {
            const mailtoLink = `mailto:phongphan.prm@gmail.com?subject=Contact Form Submission&body=${encodeURIComponent(
            `Email: ${this.email}\nName: ${this.name}\nMessage: ${this.message}`
      )}`;
      window.location.href = mailtoLink;
    }
  }
    }
</script>
<style>
    .social-circle{
        cursor: pointer;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
        font-size: 40px;
        padding: 0px 10px;
        color: #28292A;
        transform: translate(0px, -1px);
        border: 1px solid rgb(204, 204, 204);
        border-bottom: 5px solid rgb(204, 204, 204);
        transition: all 0.25s ease;
    }
    .social-circle:active{
        transform: translate(0px, 0px);
        border-bottom: 1px solid rgb(204, 204, 204);
        transition: all 0.25s ease;
    }
    .social-container{
        gap: 30px;
        padding: 10px 0px;
        width: 500px;
        background: #28292A;
        border-radius: 20px;
        border-bottom: 5px solid rgb(204, 204, 204);
    }
    .tool-container{
        background-color: white;
        border-radius: 20px;
        width: 95px;
        height: 90px;
    }
    .tool-container img{
        width: 75%;
    }
    .contact-text h1{
        transform: translate(0px, -1px);
        text-shadow: 0px 5px #28292A;
        transition: all 0.25s ease;
    }
    .contact-text h1:hover{
        transform: translate(0px, 0px);
        text-shadow: 0px 0px #28292A;
        transition: all 0.25s ease;
    }
    .contact button{
        font-size: 15px !important;
        border-radius: 20px;
        text-align: center;
        width: 18rem;
        height: 2.5rem;
        outline: none;
        border: none;
        background: #28292A;
        border-bottom: 5px solid #0a0a0a;
        transform: translate(0px, -5px);
        transition: all 0.25s ease;
    }
    .contact button:active{
        border-bottom: 0px solid #0a0a0a;
        transform: translate(0px, 0px);
        transition: all 0.25s ease;
    }
    form input{
        border-radius: 20px;
        text-align: center;
        width: 18rem;
        height: 2.5rem;
        outline: none;
        border: none;
        border-bottom: 5px solid rgb(204, 204, 204);
        transform: translate(0px, -5px);
        transition: all 0.25s ease;
    }
    form input:active{
        border-bottom: 0px solid rgb(204, 204, 204);
        transform: translate(0px, 0px);
        transition: all 0.25s ease;
    }
    .box-about{
        background: rgb(178,178,178);
        background: linear-gradient(137deg, rgba(178,178,178,0.3309698879551821) 0%, rgba(178,178,178,0.23012955182072825) 100%);
        border: 3px solid rgb(231, 231, 231);
        border-radius: 20px;
    }
    
    .circle-buttom{
        cursor: pointer;
        z-index: 15;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        clip-path: circle(100px at center 500px);
        transition: all 0.25s ease;
    }
    .circle-buttom:active{
        clip-path: circle(100px at center 510px);
        transition: all 0.25s ease;
    }
    .circle-buttom-shadow{
        z-index: 10;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #cccccc;
        clip-path: circle(100px at center 510px);
    }
    .circle-img{
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #28292A;
        clip-path: circle(150px at center 510px);
    }


</style>