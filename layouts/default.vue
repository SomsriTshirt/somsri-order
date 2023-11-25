<script setup lang="ts">
import Navbar from '@/components/Component/NavbarComponent.vue';
</script>
<template>
  <div>
    <Navbar class="mb-5"></Navbar>
    <div class="mb-16">
      <div class="container mx-auto px-6 pt-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
