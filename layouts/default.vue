<script setup lang="ts">
import Navbar from '@/components/Component/NavbarComponent.vue'
</script>
<template>
    <div>
        <Navbar class="mb-5"></Navbar>
        <div class="mb-16">
            <slot></slot>
        </div>
    </div>
</template>