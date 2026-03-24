<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tag Manager</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="page-content ion-padding">
        <section class="hero">
          <h1>Manage your tags</h1>
          <p>Add a tag, see a live preview, and keep a small starter list in one place.</p>
        </section>

        <ion-item class="tag-input" lines="full">
          <ion-input
            v-model="draftTag"
            label="Tag"
            label-placement="stacked"
            placeholder="Enter tag"
            clear-input
            @keyup.enter="addTag"
          />
          <ion-button slot="end" @click="addTag">Add</ion-button>
        </ion-item>

        <p class="helper-text">{{ helperText }}</p>

        <ion-list inset>
          <ion-list-header>
            <ion-label>Current tags</ion-label>
          </ion-list-header>
          <ion-item v-for="tag in tags" :key="tag">
            <ion-label>{{ tag }}</ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';

const draftTag = ref('');
const tags = ref(['ionic', 'vue', 'testing']);

const normalizedDraft = computed(() => draftTag.value.trim().toLowerCase());

const helperText = computed(() => {
  if (!normalizedDraft.value) {
    return 'Tip: press Enter or use the Add button to append a new tag.';
  }

  if (tags.value.includes(normalizedDraft.value)) {
    return `Tag "${normalizedDraft.value}" is already in the list.`;
  }

  return `Ready to add "${normalizedDraft.value}".`;
});

const addTag = (): void => {
  if (!normalizedDraft.value || tags.value.includes(normalizedDraft.value)) {
    draftTag.value = normalizedDraft.value;
    return;
  }

  tags.value = [...tags.value, normalizedDraft.value];
  draftTag.value = '';
};
</script>

<style scoped>
.page-content {
  display: grid;
  gap: 16px;
}

.hero h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.hero p {
  margin: 0;
  color: var(--ion-color-medium);
  line-height: 1.5;
}

.tag-input {
  --padding-start: 0;
}

.helper-text {
  margin: 0;
  color: var(--ion-color-medium-shade);
  min-height: 24px;
}
</style>
