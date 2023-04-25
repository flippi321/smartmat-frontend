<template>
  <div class="info-text">
    <div v-for="(paragraph, index) in paragraphs" :key="index" class="info-section">
      <img :src="icons[index]" alt="section image" class="section-image" />
      <p>{{ paragraph }}</p>
    </div>
  </div>
</template>

<script>
import smartMatLogo from "@/assets/icons/Logo.png"
import recycle from "@/assets/icons/recycle.png"
import fridge from "@/assets/icons/Fridge.png"

export default {
  name: "HomePageTextComponent",
  data() {
    return {
      paragraphs: [
        "Velkommen til SmartMat – nettsiden som hjelper deg med å redusere matsvinn og spare penger, samtidig som du tar vare på miljøet. Vi er et innovativt og engasjert team som har som mål å hjelpe familier og privatpersoner i Norge med å redusere deres matsvinn gjennom smarte og praktiske løsninger.",
        "Vår visjon er enkel, men kraftfull: Vi ønsker å skape en bærekraftig fremtid ved å hjelpe mennesker med å ta kontroll over sitt matforbruk og redusere unødvendig avfall.",
        "SmartMat-nettsiden tilbyr en rekke funksjoner som gjør det enkelt for deg å holde oversikt over innholdet i kjøleskapet ditt. Ved å legge inn dine matvarer i systemet, kan SmartMat generere deilige og sunne retter basert på det du allerede har. Slik får du mest mulig ut av ingrediensene og reduserer samtidig matsvinnet.",
        "Vår integrerte handleliste-funksjon gjør det enkelt å planlegge innkjøp og holde oversikt over hva du trenger. Når du har handlet, kan du enkelt flytte varene fra handlelisten til kjøleskapet i systemet, slik at du alltid vet hva du har og når det utløper. Dette bidrar til en mer økonomisk og miljøvennlig hverdag.",
        "SmartMat er ikke bare en nettside – det er en livsstilsendring som hjelper deg med å ta smartere valg når det kommer til mat. Vi tror på å skape en bedre fremtid for oss alle ved å ta ansvar for vårt matforbruk og redusere matsvinn, ett måltid av gangen. Bli med oss i kampen mot matsvinn og la SmartMat gjøre hverdagen din enklere, billigere og mer bærekraftig.",
      ],
      icons: [
        smartMatLogo,
        recycle,
        fridge,
        smartMatLogo,
        smartMatLogo,
      ],
    };
  },
};
</script>

<style>
.info-text {
  text-align: center;
  width: 80%;
  margin: 0 auto;
  font-size: 1.25rem;
}

.info-section {
  margin-bottom: 100px;
  position: relative;
}

.section-image {
  display: block;
  margin: 0 auto;
  max-width: 30%;
}
</style>
