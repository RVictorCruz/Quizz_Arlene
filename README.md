# 💊 FarmacoGame Studio

Uma plataforma interativa de aprendizado desenvolvida com **HTML5, CSS3 e JavaScript** para auxiliar estudantes na fixação de conceitos fundamentais de Farmacologia.

## 🚀 Sobre o Projeto

Este projeto transforma conteúdos técnicos densos em experiências lúdicas. O foco principal são os princípios da **Farmacocinética** e a dualidade do **Sistema Nervoso Autônomo (SNA)**.

O projeto é dividido em dois módulos principais:
1. **Quem Sou Eu?**: Um quiz de adivinhação com dicas progressivas sobre fármacos e vias de administração.
2. **Desafio do SNA**: Um simulador de reflexos onde o jogador deve reagir conforme o sistema Simpático ou Parassimpático.

## 🧠 Conceitos Aplicados

Os jogos foram baseados nos seguintes tópicos acadêmicos:
- **Farmacocinética:** Absorção, Biodisponibilidade e Vias de Administração (Oral, IV, Sublingual).
- **SNA Parassimpático:** Atuação da Acetilcolina e Antagonistas Muscarínicos (Atropina, Escopolamina).
- **SNA Simpático:** Respostas de "Luta ou Fuga", receptores Adrenérgicos e fármacos como Adrenalina e Propranolol.
- **Farmacodinâmica:** Potência, Eficácia e interação Fármaco-Receptor.

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica das telas e jogos.
- **CSS3:** Animações de transição, design responsivo e efeitos visuais nos órgãos (Transitions e Keyframes).
- **JavaScript (Vanilla):** Lógica de estados, temporizadores (`setInterval`), manipulação de DOM e sistemas de pontuação.
- **Native Audio API:** Implementação de feedbacks sonoros para acertos e erros.

## 📁 Estrutura de Arquivos

```text
├── index.html          # Tela de seleção principal
├── quiz.html           # Módulo "Quem sou eu?"
├── sna.html            # Módulo "Desafio do SNA"
├── style.css           # Estilização global e animações
├── script.js           # Lógica dos jogos e banco de dados
├── assets/
│   ├── images/         # Ilustrações dos órgãos (Coração, Pulmão, etc)
│   └── sounds/         # Efeitos sonoros (mp3/wav)
