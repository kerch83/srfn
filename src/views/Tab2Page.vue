<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Saved Views</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="page-content ion-padding">
        <h1>Quick filters</h1>
        <ion-list inset>
          <ion-item>
            <ion-label>
              <h2>Recent tags</h2>
              <p>Open the latest tags you added on the first tab.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <h2>Popular tags</h2>
              <p>Use this area later for server-backed analytics.</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
</script>

<style scoped>
.page-content {
  display: grid;
  gap: 16px;
}

h1 {
  margin: 0;
}
</style>
