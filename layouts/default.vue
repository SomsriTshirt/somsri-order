<script setup lang="ts">
import Navbar from '@/components/Component/NavbarComponent.vue';
</script>
<template>
  <div class="w-screen">
    <Navbar class="mb-5 sticky top-0 z-10"></Navbar>
    <div class="mb-16">
      <div class="container mx-auto px-6 pt-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
