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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
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
const tags = ref<string[]>(['ionic', 'vue', 'testing']);
const isYjsReady = ref(false);

type YDocLike = {
  destroy: () => void;
  getArray: <T>(name: string) => YArrayLike<T>;
};

type YArrayLike<T> = {
  length: number;
  push: (items: T[]) => void;
  toArray: () => T[];
  observe: (callback: () => void) => void;
  unobserve: (callback: () => void) => void;
};

declare global {
  interface Window {
    Y?: {
      Doc: new () => YDocLike;
    };
  }
}

const YJS_CDN_URL = 'https://unpkg.com/yjs@13.6.27/dist/yjs.js';
let yDoc: YDocLike | null = null;
let yTags: YArrayLike<string> | null = null;

const syncTagsFromYjs = (): void => {
  if (!yTags) {
    return;
  }

  tags.value = yTags.toArray();
};

const loadYjsFromCdn = async (): Promise<void> => {
  if (window.Y?.Doc) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${YJS_CDN_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Yjs script')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = YJS_CDN_URL;
    script.async = true;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('Failed to load Yjs script')), { once: true });
    document.head.append(script);
  });

  if (!window.Y?.Doc) {
    throw new Error('Yjs is unavailable after script load');
  }
};

const normalizedDraft = computed(() => draftTag.value.trim().toLowerCase());

const helperText = computed(() => {
  if (!isYjsReady.value) {
    return 'Yjs is loading from CDN. You can still prepare your next tag.';
  }

  if (!normalizedDraft.value) {
    return 'Tip: press Enter or use the Add button to append a new tag. Changes are stored in a Yjs document.';
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

  if (yTags) {
    yTags.push([normalizedDraft.value]);
  } else {
    tags.value = [...tags.value, normalizedDraft.value];
  }

  draftTag.value = '';
};

onMounted(async () => {
  try {
    await loadYjsFromCdn();

    const Y = window.Y;
    if (!Y?.Doc) {
      return;
    }

    yDoc = new Y.Doc();
    yTags = yDoc.getArray<string>('tags');

    if (yTags.length === 0) {
      yTags.push(tags.value);
    }

    syncTagsFromYjs();
    yTags.observe(syncTagsFromYjs);
    isYjsReady.value = true;
  } catch {
    isYjsReady.value = false;
  }
});

onBeforeUnmount(() => {
  if (yTags) {
    yTags.unobserve(syncTagsFromYjs);
  }

  yDoc?.destroy();
  yDoc = null;
  yTags = null;
});
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
