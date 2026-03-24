<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>About</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="page-content ion-padding">
        <h1>Starter app status</h1>
        <p>
          This Ionic + Vue starter has been cleaned up so the navigation, content, and tests all describe the same UI.
        </p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
</script>

<style scoped>
.page-content {
  display: grid;
  gap: 12px;
}

h1,
p {
  margin: 0;
}
</style>
