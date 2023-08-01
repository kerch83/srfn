<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-input label="tag" placeholder="Enter tag"></ion-input>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
