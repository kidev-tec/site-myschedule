/**
 * Configuração Stryker para o site AGENVA (Nuxt 4 + Vitest).
 * Testa: components/SegmentsCarousel.vue, data/site.ts (dados).
 * Goal: 100% Mutation Score (BARRA.md)
 */
module.exports = {
  mutators: ['boolean-value', 'string-replacement', 'conditional-expression'],
  // Foco no que mudou e é mais crítico, não em utils/data estático
  src: [
    'components/SegmentsCarousel.vue',
  ],
  // Usa o runner do Vitest
  runner: '@stryker-mutator/vitest-runner',
  // Estratégia de loop: Ciclo completo (testes + mutante) + 3 buckets de survivor
  config: {
    maxSurvivors: 3,
    // Define que testes novos devem ser validados por sed no mutante + vitest run
    newTestValidation: true, 
  }
}