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
      <div class="info-text" :class="{ showInfoText: showInfoText }">
        <p>
          En gjennomsnittlig norsk familie kaster årlig 42 kg mat per person. SmartMat sin visjon er å redusere dette
          matsvinnet ved å hjelpe brukerne med å planlegge måltidene sine slik at de kaster minst mulig mat.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTitle: false,
      showButton: false,
      showInfoText: false,
      showImage: false,
    };
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
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollDownContent = document.querySelector(".scroll-down-content");
      const rect = scrollDownContent.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        this.showInfoText = true;
      }
    },
  },
};
</script>

<style scoped>
.homepage {
  height: 100vh;
  width: 100%;
  font-family: Arial, sans-serif;
  color: #333;
}

.background-image-container {
  position: absolute;
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
  max-width: 800px;
  margin: 0 auto;
  padding: 2em;
  font-size: 1.2em;
  line-height: 1.6;
  opacity: 0;
  transition: opacity 0.5s;
}

.showInfoText {
  opacity: 1;
}
</style>
