<template>
  <div class="homepage">
    <div class="background-image-container" :class="{ showImage: showImage }">
      <img src="@/assets/images/homepageImage.jpg" alt="homepage image" />
      <div class="content-container">
        <h1 class="title" :class="{ showTitle: showTitle }">Kast mindre mat med SmartMat</h1>
        <router-link
            :class="{ showButton: showButton }"
            to="/login"
            class="cta-button"
        >
          Bli Med idag!
        </router-link>
      </div>
    </div>
    <div class="scroll-down-content">
      <HomePageTextComponent />
    </div>
  </div>
</template>

<script>
import HomePageTextComponent from "@/components/HomePageTextComponent.vue";

export default {
  components: {
    HomePageTextComponent
  },

  data() {
    return {
      showTitle: false,
      showButton: false,
      showImage: false,
    };
  },
  computed: {
    informationComponentTop() {
      const scrollDownContent = this.$el.querySelector(".scroll-down-content");
      return scrollDownContent.offsetTop;
    },
  },
  methods: {
    sendToInformation() {
      window.scrollTo({
        top: this.informationComponentTop,
        behavior: "smooth",
      });
    },
    sendToStartPage() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    handleScroll(event) {
      const deltaY = event.deltaY;

      if (deltaY > 0 && window.scrollY >= 0 && window.scrollY <= 500) {
        this.sendToInformation();
      } else if (deltaY < 0 && window.scrollY >= this.informationComponentTop - 250 && window.scrollY <= this.informationComponentTop + 250) {
        this.sendToStartPage();
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.showImage = true;
    }, 0);
    setTimeout(() => {
      this.showTitle = true;
    }, 1000);
    setTimeout(() => {
      this.showButton = true;
    }, 2000);
    setTimeout(() => {
      this.sendToInformation();
    }, 3000);
    window.addEventListener("wheel", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("wheel", this.handleScroll);
  },
};
</script>


<style scoped>
.homepage {
  height: auto;
  width: 100%;
  font-family: Arial, sans-serif;
  color: #333;
}

.background-image-container {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity 1s;
}

.showImage {
  opacity: 1;
}

.background-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.5;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 100%);
  mix-blend-mode: multiply;
}

.content-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
}

.title {
  font-size: 3em;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1em;
  opacity: 0;
  transition: opacity 1s;
}

.showTitle {
  opacity: 1;
}

.cta-button {
  display: inline-block;
  background-color: #2e7d32;
  color: #fff;
  padding: 12px 24px;
  font-size: 1.2em;
  text-decoration: none;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 1s;
}

.showButton {
  opacity: 1;
}

.scroll-down-content {
  padding-top: 100px;
  padding-bottom: 2rem;
}
</style>