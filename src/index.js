import agelForm from './agel-form.vue';

if (typeof window !== 'undefined' && window.Vue) {
  agelForm.install(window.Vue);
}

export default agelForm;
