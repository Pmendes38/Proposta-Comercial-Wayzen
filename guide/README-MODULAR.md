# 🚀 Proposta Interativa Wayzen - Versão Modular 2.0

Refatoração da aplicação de propostas comerciais para uma **arquitetura modular profissional**, mantendo 100% da funcionalidade original.

## 📁 Estrutura de Pastas

```
propostainterativa/
├── css/
│   ├── main.css              # Importa todos os CSS
│   ├── variables.css         # Variáveis de tema (cores, fontes)
│   ├── base.css              # Reset e estilos globais
│   ├── animations.css        # Keyframes e animações
│   ├── layout.css            # Layout principal, sidebar, slides
│   └── components.css        # Componentes reutilizáveis
│
├── js/
│   ├── components/           # Componentes React reutilizáveis
│   │   ├── Icon.jsx          # Ícones SVG
│   │   ├── WzLogo.jsx        # Logo da Wayzen
│   │   ├── Field.jsx         # Campo de formulário
│   │   ├── Slider.jsx        # Input de range
│   │   ├── Orbs.jsx          # Efeitos de background
│   │   ├── SlideShell.jsx    # Wrapper para slides
│   │   ├── Sidebar.jsx       # Barra lateral de navegação
│   │   ├── PhaseIdent.jsx    # Fase 1: Identificação
│   │   └── index.js          # Exportações
│   │
│   ├── data.js               # Constantes e dados (PLANS, SPRINTS, TEAM, etc)
│   ├── utils.js              # Funções utilitárias (fmtBRL, useLS, etc)
│   └── main.jsx              # Entrada da aplicação React
│
├── index.html                # HTML de entrada limpo
├── package.json              # Dependências do projeto
├── vite.config.js            # Configuração do Vite (build tool)
└── README.md                 # Este arquivo
```

## 🎯 O Que Mudou

### Antes (Single-file)
- ❌ 1.513 linhas em um único arquivo HTML
- ❌ CSS, JS e HTML misturados
- ❌ Difícil manutenção e reuso
- ❌ Sem separação de responsabilidades

### Depois (Modular)
- ✅ Componentes React separados
- ✅ CSS organizado em 6 arquivos temáticos
- ✅ Dados e utilidades em módulos independentes
- ✅ Fácil manutenção e escalabilidade
- ✅ Melhor performance e treeshaking

## 🛠️ Como Usar

### 1. Instalação

```bash
# Instalar dependências
npm install

# Ou se usar yarn/pnpm
yarn install
pnpm install
```

### 2. Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento (Vite)
npm run dev

# A aplicação estará disponível em http://localhost:5173
```

### 3. Build para Produção

```bash
# Gerar bundle otimizado
npm run build

# Pré-visualizar antes de publicar
npm run preview
```

## 📦 Dependências

```json
{
  "react": "^18.2.0",         // Framework UI
  "react-dom": "^18.2.0"      // Renderização React
}
```

### DevDependencies (apenas para desenvolvimento)
- **Vite** - Build tool rápido e moderno
- **@vitejs/plugin-react** - Plugin para React no Vite
- **@babel/preset-react** - Compilador para JSX

## 🎨 Arquitetura CSS

### variables.css
Define o design system completo:
- Cores (bg, surface, accent, etc)
- Tipografia (fontes, tamanhos)
- Espaçamento
- Border radius
- Transições

### base.css
- Reset CSS global
- Tipografia base
- Estilos de scrollbar
- Media queries de impressão

### animations.css
- 8 keyframes (@keyframes)
- Classes reutilizáveis (.au, .ai, .al, etc)

### layout.css
- .shell - Layout flexbox principal
- .sidebar - Barra lateral
- .main, .scroll - Áreas de conteúdo
- .slide - Slides de apresentação
- .pres-nav - Navegação de slides

### components.css
- Badges (.badge, .ba, .bn, .bok, etc)
- Botões (.btn, .btn-p, .btn-s, .btn-g)
- Cards (.card, .divider)
- Formulários (.fg, .fi, .fl)
- Campos (.tag, .ci, .ci-icon)
- Diagnóstico (.diag-card)

## ⚛️ Arquitetura React

### Componentes Básicos
- **Icon** - Ícones SVG reutilizáveis
- **WzLogo** - Logo customizável
- **Field** - Wrapper para inputs com label e hint
- **Slider** - Input range com styling

### Componentes de Layout
- **Sidebar** - Navegação e progress
- **SlideShell** - Wrapper para slides de apresentação
- **Orbs** - Efeitos visuais de background

### Componentes de Formulário
- **PhaseIdent** - Identificação da empresa/cliente
- **PhaseFoco** - Definição de foco e contexto
- **PhaseDiag** - Diagnóstico completo (6 abas)

### Hooks Customizados
- **useLS()** - LocalStorage com JSON e fallback

### Utilidades
- **fmtBRL()** - Formatação de valores em Real
- **calcularGargalos()** - Identifica problemas operacionais
- **calcularMetricas()** - Calcula KPIs financeiros
- **calcularScore()** - Gera score geral da operação

## 🚀 Fluxo da Aplicação

```
App (estado global)
├── Home (tela inicial)
├── FormWizard (3 fases)
│   ├── PhaseIdent
│   ├── PhaseFoco
│   └── PhaseDiag
└── Presentation (10 slides)
    ├── Slide1 - Capa
    ├── Slide2 - Como trabalhamos
    ├── Slide3 - Jornada completa
    ├── Slide4 - Nosso time
    ├── Slide5 - O que instalamos
    ├── Slide6 - Cases / Resultados
    ├── Slide7 - Diferenciais
    ├── Slide8 - 4 Sprints
    ├── Slide9 - Sua empresa ao final
    └── Slide10 - Investimento + simulador
```

## 💾 LocalStorage

A aplicação usa localStorage para persistir dados:

```javascript
// Estrutura de chaves
wz_c3 -> client (identificação)
wz_d3 -> diag (diagnóstico)
wz_s3 -> simulação
wz_p3 -> plano selecionado
wz_sv3 -> propostas salvas
```

## 🔄 Como Adicionar Novos Componentes

### 1. Criar arquivo em `js/components/`

```jsx
// js/components/MeuComponente.jsx
export default function MeuComponente({ prop1, prop2 }) {
  return <div className="meu-componente">{prop1}</div>;
}
```

### 2. Exportar em `js/components/index.js`

```js
export { default as MeuComponente } from './MeuComponente';
```

### 3. Importar onde necesário

```jsx
import { MeuComponente } from '../components';
```

## 🎨 Como Estender CSS

### Adicionar variável
```css
/* Em variables.css */
:root {
  --minha-cor: #ff0000;
  --meu-tamanho: 32px;
}
```

### Usar em componentes
```css
.meu-elemento {
  color: var(--minha-cor);
  width: var(--meu-tamanho);
}
```

## 📱 Responsividade

Todos os componentes usam `clamp()` para font-size responsivo:

```css
font-size: clamp(1.4rem, 2.5vw, 2rem);
/* min: 1.4rem | preferido: 2.5% do viewport | max: 2rem */
```

## 🖨️ Impressão

Classes `.no-print` ocultam elementos na impressão:
```css
.no-print { display: none !important; }
.print-show { display: block !important; }
```

## ✅ Funcionalidades Mantidas

- ✅ Formulário em 3 fases
- ✅ Diagnóstico com 6 abas
- ✅ Detecção automática de gargalos
- ✅ Cálculo de métricas financeiras
- ✅ Apresentação com 10 slides
- ✅ Simulador de investimento
- ✅ Export para PDF (print)
- ✅ Cópia para WhatsApp
- ✅ Navegação por teclado
- ✅ LocalStorage persistente
- ✅ Efeitos visuais com Orbs
- ✅ Dark theme nativo

## 🔧 Troubleshooting

### Componentes não aparecem
- Verifique se foi exportado em `components/index.js`
- Verifique o import statement
- Console (F12) mostrará erros

### Estilos não aplicados
- Verifique se `css/main.css` está importado em `index.html`
- Verifique a classe CSS está correta
- Use DevTools (F12) para inspecionar

### LocalStorage cheio
```javascript
// Limpar tudo
localStorage.clear();

// Ou apenas uma chave
localStorage.removeItem('wz_c3');
```

## 📈 Performance

- **Code Splitting** - Vite divide automaticamente em chunks
- **Lazy Loading** - Componentes carregam conforme necessário
- **Minificação** - CSS/JS otimizados em produção
- **Caching** - Assets cacheados pelo navegador

## 🔐 Deploy

### Opção 1: Vercel (recomendado para React)
```bash
npm i -g vercel
vercel
```

### Opção 2: Netlify
```bash
npm run build
# Suba a pasta dist no Netlify
```

### Opção 3: GitHub Pages
Configure `vite.config.js` com base correta.

## 📝 Próximos Passos

1. **Adicionar mais componentes** - PhaseFoco, PhaseDiag, Slides
2. **Testes unitários** - Jest + React Testing Library
3. **TypeScript** - Type safety para toda a aplicação
4. **Temas** - Suporte a light/dark themes com CSS custom properties
5. **i18n** - Suporte a múltiplos idiomas
6. **Analytics** - Tracking de eventos

## 🤝 Contribuindo

1. Crie uma branch (`git checkout -b feature/nova-feature`)
2. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
3. Push para a branch (`git push origin feature/nova-feature`)
4. Abra um Pull Request

## 📄 Licença

MIT - Livre para usar, modificar e distribuir.

---

**Versão:** 2.0.0  
**Data:** Fevereiro 2026  
**Responsável:** Pedro Mendes (Wayzen)

Para dúvidas, consulte a documentação do React em https://react.dev
