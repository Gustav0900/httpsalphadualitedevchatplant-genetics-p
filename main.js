import './style.css';
import { faker } from '@faker-js/faker';

// Configurar faker para português brasileiro
faker.locale = 'pt_BR';

class PlantGeneticsApp {
  constructor() {
    this.currentTab = 'dashboard';
    this.species = [];
    this.crossings = [];
    this.aiModels = [];
    this.notifications = [];
    this.init();
  }

  init() {
    this.generateMockData();
    this.render();
    this.bindEvents();
  }

  generateMockData() {
    // Gerar espécies de plantas
    const plantTypes = [
      { name: 'Tomate', scientific: 'Solanum lycopersicum', family: 'Solanaceae', icon: '🍅' },
      { name: 'Milho', scientific: 'Zea mays', family: 'Poaceae', icon: '🌽' },
      { name: 'Feijão', scientific: 'Phaseolus vulgaris', family: 'Fabaceae', icon: '🫘' },
      { name: 'Trigo', scientific: 'Triticum aestivum', family: 'Poaceae', icon: '🌾' },
      { name: 'Soja', scientific: 'Glycine max', family: 'Fabaceae', icon: '🫛' },
      { name: 'Arroz', scientific: 'Oryza sativa', family: 'Poaceae', icon: '🌾' },
      { name: 'Batata', scientific: 'Solanum tuberosum', family: 'Solanaceae', icon: '🥔' },
      { name: 'Cenoura', scientific: 'Daucus carota', family: 'Apiaceae', icon: '🥕' }
    ];

    const resistanceTypes = ['Seca', 'Pragas', 'Fungos', 'Frio', 'Calor', 'Salinidade'];
    const climateTypes = ['Tropical', 'Temperado', 'Árido', 'Subtropical', 'Mediterrâneo'];

    this.species = plantTypes.map((plant, index) => ({
      id: index + 1,
      name: plant.name,
      scientificName: plant.scientific,
      family: plant.family,
      icon: plant.icon,
      climate: faker.helpers.arrayElement(climateTypes),
      cultivationTime: faker.number.int({ min: 30, max: 180 }),
      productivity: faker.number.float({ min: 1.2, max: 8.5, precision: 0.1 }),
      resistances: faker.helpers.arrayElements(resistanceTypes, { min: 1, max: 3 }),
      nutritionalValue: faker.number.float({ min: 2.0, max: 9.5, precision: 0.1 }),
      addedDate: faker.date.recent({ days: 365 }),
      status: faker.helpers.arrayElement(['Ativo', 'Em Teste', 'Aprovado'])
    }));

    // Gerar cruzamentos
    this.crossings = Array.from({ length: 12 }, (_, index) => {
      const parent1 = faker.helpers.arrayElement(this.species);
      const parent2 = faker.helpers.arrayElement(this.species.filter(s => s.id !== parent1.id));
      
      return {
        id: index + 1,
        parent1: parent1,
        parent2: parent2,
        crossingDate: faker.date.recent({ days: 180 }),
        status: faker.helpers.arrayElement(['Em Andamento', 'Concluído', 'Análise', 'Falhou']),
        successRate: faker.number.float({ min: 0.3, max: 0.95, precision: 0.01 }),
        predictedTraits: faker.helpers.arrayElements([
          'Maior produtividade', 'Resistência a seca', 'Melhores nutrientes',
          'Crescimento acelerado', 'Resistência a pragas', 'Adaptação climática'
        ], { min: 2, max: 4 }),
        aiConfidence: faker.number.float({ min: 0.65, max: 0.98, precision: 0.01 })
      };
    });

    // Gerar modelos de IA
    this.aiModels = [
      {
        id: 1,
        name: 'GenePlant Neural Network',
        type: 'Rede Neural Profunda',
        accuracy: 0.94,
        trainedSamples: 15420,
        lastUpdate: faker.date.recent({ days: 7 }),
        status: 'Ativo'
      },
      {
        id: 2,
        name: 'CrossPredict AI',
        type: 'Floresta Aleatória',
        accuracy: 0.89,
        trainedSamples: 8750,
        lastUpdate: faker.date.recent({ days: 3 }),
        status: 'Treinando'
      },
      {
        id: 3,
        name: 'TraitOptimizer',
        type: 'SVM Avançado',
        accuracy: 0.91,
        trainedSamples: 12300,
        lastUpdate: faker.date.recent({ days: 14 }),
        status: 'Ativo'
      }
    ];

    // Gerar notificações
    this.notifications = [
      {
        id: 1,
        message: 'Novo cruzamento entre Tomate e Batata concluído com 89% de sucesso',
        type: 'success',
        timestamp: faker.date.recent({ days: 1 })
      },
      {
        id: 2,
        message: 'Modelo GenePlant Neural Network atualizado com novos dados',
        type: 'info',
        timestamp: faker.date.recent({ days: 2 })
      },
      {
        id: 3,
        message: 'Análise de biossegurança requerida para cruzamento #CR-0847',
        type: 'warning',
        timestamp: faker.date.recent({ days: 1 })
      }
    ];
  }

  render() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      ${this.renderHeader()}
      ${this.renderNavigation()}
      <main class="main-content">
        <div class="container">
          ${this.renderTabContent()}
        </div>
      </main>
    `;
  }

  renderHeader() {
    return `
      <header class="header">
        <div class="container">
          <div class="header-content">
            <div class="logo">
              <div class="logo-icon">🧬</div>
              <span>PlantGenAI</span>
            </div>
            <div class="user-menu">
              <button class="notification-btn" onclick="app.showNotifications()">
                🔔
                <span class="badge">${this.notifications.length}</span>
              </button>
              <div class="user-profile">
                <div class="avatar">DR</div>
                <div>
                  <div style="font-weight: 600;">Dr. Pesquisador</div>
                  <div style="font-size: 0.85rem; opacity: 0.8;">Geneticista</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  renderNavigation() {
    const tabs = [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'database', label: 'Banco de Dados', icon: '🗃️' },
      { id: 'ai-training', label: 'Treinamento IA', icon: '🤖' },
      { id: 'simulation', label: 'Simulação', icon: '🧪' },
      { id: 'visualization', label: 'Visualização', icon: '📈' },
      { id: 'collaboration', label: 'Colaboração', icon: '👥' },
      { id: 'safety', label: 'Biossegurança', icon: '🛡️' }
    ];

    return `
      <nav class="nav-tabs">
        <div class="container">
          <ul class="nav-tabs-list">
            ${tabs.map(tab => `
              <li>
                <button class="nav-tab ${this.currentTab === tab.id ? 'active' : ''}" 
                        onclick="app.switchTab('${tab.id}')">
                  <span>${tab.icon}</span>
                  ${tab.label}
                </button>
              </li>
            `).join('')}
          </ul>
        </div>
      </nav>
    `;
  }

  renderTabContent() {
    return `
      <div id="dashboard" class="tab-content ${this.currentTab === 'dashboard' ? 'active' : ''}">
        ${this.renderDashboard()}
      </div>
      <div id="database" class="tab-content ${this.currentTab === 'database' ? 'active' : ''}">
        ${this.renderDatabase()}
      </div>
      <div id="ai-training" class="tab-content ${this.currentTab === 'ai-training' ? 'active' : ''}">
        ${this.renderAITraining()}
      </div>
      <div id="simulation" class="tab-content ${this.currentTab === 'simulation' ? 'active' : ''}">
        ${this.renderSimulation()}
      </div>
      <div id="visualization" class="tab-content ${this.currentTab === 'visualization' ? 'active' : ''}">
        ${this.renderVisualization()}
      </div>
      <div id="collaboration" class="tab-content ${this.currentTab === 'collaboration' ? 'active' : ''}">
        ${this.renderCollaboration()}
      </div>
      <div id="safety" class="tab-content ${this.currentTab === 'safety' ? 'active' : ''}">
        ${this.renderSafety()}
      </div>
    `;
  }

  renderDashboard() {
    return `
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">${this.species.length}</div>
          <div class="stat-label">Espécies Cadastradas</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${this.crossings.length}</div>
          <div class="stat-label">Cruzamentos Ativos</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${this.aiModels.filter(m => m.status === 'Ativo').length}</div>
          <div class="stat-label">Modelos IA Ativos</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">94%</div>
          <div class="stat-label">Taxa de Sucesso</div>
        </div>
      </div>

      <div class="grid grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              🧪 Cruzamentos Recentes
            </h3>
            <p class="card-description">Últimos experimentos realizados</p>
          </div>
          <div class="card-content">
            ${this.crossings.slice(0, 5).map(crossing => `
              <div style="padding: 1rem; border-bottom: 1px solid var(--border-color); last-child:border-bottom: none;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <strong>${crossing.parent1.name} × ${crossing.parent2.name}</strong>
                  <span class="tag">${crossing.status}</span>
                </div>
                <div style="font-size: 0.9rem; color: var(--text-secondary);">
                  Taxa de Sucesso: ${(crossing.successRate * 100).toFixed(1)}%
                </div>
                <div class="progress-bar" style="margin-top: 0.5rem;">
                  <div class="progress-fill" style="width: ${crossing.aiConfidence * 100}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              📈 Performance dos Modelos
            </h3>
            <p class="card-description">Estatísticas dos modelos de IA</p>
          </div>
          <div class="card-content">
            ${this.aiModels.map(model => `
              <div style="padding: 1rem; border-bottom: 1px solid var(--border-color); last-child:border-bottom: none;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <strong>${model.name}</strong>
                  <span class="tag">${model.status}</span>
                </div>
                <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                  Precisão: ${(model.accuracy * 100).toFixed(1)}% | Amostras: ${model.trainedSamples.toLocaleString()}
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${model.accuracy * 100}%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderDatabase() {
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2>Banco de Dados de Espécies</h2>
        <button class="btn btn-primary" onclick="app.showAddSpeciesForm()">
          ➕ Adicionar Espécie
        </button>
      </div>

      <div class="card" style="margin-bottom: 2rem;">
        <div class="card-content">
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr auto; gap: 1rem; align-items: end;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Buscar por nome</label>
              <input type="text" class="form-input" placeholder="Digite o nome da espécie..." />
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Família</label>
              <select class="form-select">
                <option value="">Todas as famílias</option>
                <option value="solanaceae">Solanaceae</option>
                <option value="poaceae">Poaceae</option>
                <option value="fabaceae">Fabaceae</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">Clima</label>
              <select class="form-select">
                <option value="">Todos os climas</option>
                <option value="tropical">Tropical</option>
                <option value="temperado">Temperado</option>
                <option value="árido">Árido</option>
              </select>
            </div>
            <button class="btn btn-primary">🔍 Filtrar</button>
          </div>
        </div>
      </div>

      <div class="species-grid">
        ${this.species.map(species => `
          <div class="species-card">
            <div class="species-image">
              ${species.icon}
            </div>
            <div class="species-info">
              <h3 class="species-name">${species.name}</h3>
              <p class="species-scientific">${species.scientificName}</p>
              <div class="species-tags">
                <span class="tag">${species.family}</span>
                <span class="tag">${species.climate}</span>
                <span class="tag">${species.status}</span>
              </div>
              <div style="margin-bottom: 1rem;">
                <div style="font-size: 0.9rem; margin-bottom: 0.25rem;">
                  <strong>Tempo de Cultivo:</strong> ${species.cultivationTime} dias
                </div>
                <div style="font-size: 0.9rem; margin-bottom: 0.25rem;">
                  <strong>Produtividade:</strong> ${species.productivity} t/ha
                </div>
                <div style="font-size: 0.9rem;">
                  <strong>Resistências:</strong> ${species.resistances.join(', ')}
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-outline btn-small">✏️ Editar</button>
                <button class="btn btn-secondary btn-small">🧪 Usar em Cruzamento</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderAITraining() {
    return `
      <h2 style="margin-bottom: 2rem;">Treinamento de Modelos de IA</h2>

      <div class="grid grid-2" style="margin-bottom: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              🤖 Modelos Ativos
            </h3>
            <p class="card-description">Modelos em produção</p>
          </div>
          <div class="card-content">
            ${this.aiModels.map(model => `
              <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius); margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                  <h4>${model.name}</h4>
                  <span class="tag">${model.status}</span>
                </div>
                <div style="margin-bottom: 1rem;">
                  <div style="font-size: 0.9rem; margin-bottom: 0.25rem;">
                    <strong>Tipo:</strong> ${model.type}
                  </div>
                  <div style="font-size: 0.9rem; margin-bottom: 0.25rem;">
                    <strong>Precisão:</strong> ${(model.accuracy * 100).toFixed(1)}%
                  </div>
                  <div style="font-size: 0.9rem; margin-bottom: 0.25rem;">
                    <strong>Amostras:</strong> ${model.trainedSamples.toLocaleString()}
                  </div>
                  <div style="font-size: 0.9rem;">
                    <strong>Última Atualização:</strong> ${model.lastUpdate.toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div class="progress-bar" style="margin-bottom: 1rem;">
                  <div class="progress-fill" style="width: ${model.accuracy * 100}%"></div>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                  <button class="btn btn-outline btn-small">⚙️ Configurar</button>
                  <button class="btn btn-secondary btn-small">📊 Métricas</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              📈 Criar Novo Modelo
            </h3>
            <p class="card-description">Configure um novo modelo de IA</p>
          </div>
          <div class="card-content">
            <form>
              <div class="form-group">
                <label class="form-label">Nome do Modelo</label>
                <input type="text" class="form-input" placeholder="Ex: PlantOptimizer v2.0" />
              </div>
              <div class="form-group">
                <label class="form-label">Tipo de Algoritmo</label>
                <select class="form-select">
                  <option value="neural">Rede Neural Profunda</option>
                  <option value="random-forest">Floresta Aleatória</option>
                  <option value="svm">Support Vector Machine</option>
                  <option value="gradient-boost">Gradient Boosting</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Objetivo do Modelo</label>
                <select class="form-select">
                  <option value="crossing-success">Predição de Sucesso em Cruzamentos</option>
                  <option value="trait-prediction">Predição de Características</option>
                  <option value="climate-adaptation">Adaptação Climática</option>
                  <option value="disease-resistance">Resistência a Doenças</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Dataset de Treinamento</label>
                <input type="file" class="form-input" accept=".csv,.json" />
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%;">
                🚀 Iniciar Treinamento
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            📊 Histórico de Treinamentos
          </h3>
          <p class="card-description">Acompanhe o progresso dos treinamentos</p>
        </div>
        <div class="card-content">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Modelo</th>
                  <th>Tipo</th>
                  <th>Início</th>
                  <th>Duração</th>
                  <th>Precisão Final</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                ${Array.from({ length: 8 }, (_, i) => {
                  const statuses = ['Concluído', 'Em Andamento', 'Falhado', 'Pausado'];
                  const types = ['Neural Network', 'Random Forest', 'SVM', 'Gradient Boost'];
                  return `
                    <tr>
                      <td>Modelo ${String.fromCharCode(65 + i)}</td>
                      <td>${faker.helpers.arrayElement(types)}</td>
                      <td>${faker.date.recent({ days: 30 }).toLocaleDateString('pt-BR')}</td>
                      <td>${faker.number.int({ min: 2, max: 48 })}h</td>
                      <td>${(faker.number.float({ min: 0.75, max: 0.98, precision: 0.01 }) * 100).toFixed(1)}%</td>
                      <td><span class="tag">${faker.helpers.arrayElement(statuses)}</span></td>
                      <td>
                        <button class="btn btn-outline btn-small">👁️ Ver</button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  renderSimulation() {
    return `
      <h2 style="margin-bottom: 2rem;">Simulação de Cruzamentos</h2>

      <div class="card" style="margin-bottom: 2rem;">
        <div class="card-header">
          <h3 class="card-title">
            🧪 Nova Simulação de Cruzamento
          </h3>
          <p class="card-description">Selecione duas espécies para simular o cruzamento</p>
        </div>
        <div class="card-content">
          <div class="simulation-container">
            <div class="parent-selector">
              <h4>Parental 1</h4>
              <div class="parent-preview">🍅</div>
              <select class="form-select">
                <option value="">Selecione uma espécie...</option>
                ${this.species.map(species => `
                  <option value="${species.id}">${species.name} (${species.scientificName})</option>
                `).join('')}
              </select>
              <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                <div><strong>Família:</strong> Solanaceae</div>
                <div><strong>Produtividade:</strong> 4.2 t/ha</div>
                <div><strong>Resistências:</strong> Seca, Pragas</div>
              </div>
            </div>

            <div class="cross-icon">
              ✕
            </div>

            <div class="parent-selector">
              <h4>Parental 2</h4>
              <div class="parent-preview">🥔</div>
              <select class="form-select">
                <option value="">Selecione uma espécie...</option>
                ${this.species.map(species => `
                  <option value="${species.id}">${species.name} (${species.scientificName})</option>
                `).join('')}
              </select>
              <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary);">
                <div><strong>Família:</strong> Solanaceae</div>
                <div><strong>Produtividade:</strong> 6.8 t/ha</div>
                <div><strong>Resistências:</strong> Frio, Fungos</div>
              </div>
            </div>
          </div>

          <div style="text-align: center; margin: 2rem 0;">
            <button class="btn btn-primary" onclick="app.runSimulation()">
              🔬 Executar Simulação
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              📊 Resultado da Simulação
            </h3>
            <p class="card-description">Previsões baseadas em IA</p>
          </div>
          <div class="card-content">
            <div class="result-preview">
              <div style="font-size: 3rem; margin-bottom: 1rem;">🌱</div>
              <h4>Híbrido Previsto</h4>
              <p style="font-style: italic; color: var(--text-secondary);">Solanum hybrid sp.</p>
            </div>

            <div style="margin-top: 2rem;">
              <h5 style="margin-bottom: 1rem;">Características Preditas:</h5>
              <div style="display: grid; gap: 0.75rem;">
                <div style="display: flex; justify-content: space-between;">
                  <span>Taxa de Sucesso:</span>
                  <strong style="color: var(--primary-color);">87.3%</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Produtividade Estimada:</span>
                  <strong>5.8 t/ha</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Tempo de Cultivo:</span>
                  <strong>95 dias</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span>Valor Nutricional:</span>
                  <strong>7.2/10</strong>
                </div>
              </div>

              <div style="margin-top: 1.5rem;">
                <h5 style="margin-bottom: 0.75rem;">Resistências Herdadas:</h5>
                <div class="species-tags">
                  <span class="tag">Seca</span>
                  <span class="tag">Pragas</span>
                  <span class="tag">Frio</span>
                </div>
              </div>

              <div style="margin-top: 1.5rem;">
                <h5 style="margin-bottom: 0.75rem;">Confiança da IA:</h5>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 87%"></div>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">
                  87% de confiança baseada em 15.420 amostras de treinamento
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              ⚠️ Análise de Riscos
            </h3>
            <p class="card-description">Avaliação de biossegurança</p>
          </div>
          <div class="card-content">
            <div style="margin-bottom: 1.5rem;">
              <h5 style="margin-bottom: 0.75rem;">Nível de Risco: <span style="color: var(--secondary-color);">BAIXO</span></h5>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 25%; background: var(--secondary-color);"></div>
              </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <h5 style="margin-bottom: 0.75rem;">Fatores de Risco:</h5>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 0.5rem; background: rgba(76, 175, 80, 0.1); border-radius: var(--radius); margin-bottom: 0.5rem;">
                  ✅ Compatibilidade genética: Alta
                </li>
                <li style="padding: 0.5rem; background: rgba(76, 175, 80, 0.1); border-radius: var(--radius); margin-bottom: 0.5rem;">
                  ✅ Estabilidade genômica: Confirmada
                </li>
                <li style="padding: 0.5rem; background: rgba(255, 152, 0, 0.1); border-radius: var(--radius); margin-bottom: 0.5rem;">
                  ⚠️ Impacto ambiental: Monitoramento necessário
                </li>
              </ul>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <h5 style="margin-bottom: 0.75rem;">Recomendações:</h5>
              <ul style="font-size: 0.9rem; color: var(--text-secondary);">
                <li>• Teste em ambiente controlado por 3 meses</li>
                <li>• Monitoramento de polinizadores nativos</li>
                <li>• Análise de proteínas alergênicas</li>
                <li>• Avaliação de impacto em culturas adjacentes</li>
              </ul>
            </div>

            <button class="btn btn-primary" style="width: 100%;">
              📝 Gerar Relatório Completo
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderVisualization() {
    return `
      <h2 style="margin-bottom: 2rem;">Visualização e Análise</h2>

      <div class="grid grid-2" style="margin-bottom: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              🌳 Árvore Genealógica
            </h3>
            <p class="card-description">Relações entre espécies e híbridos</p>
          </div>
          <div class="card-content">
            <div style="text-align: center; padding: 2rem; background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: var(--radius);">
              <div style="display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 1rem;">
                <div style="display: flex; gap: 2rem; align-items: center;">
                  <div style="text-align: center;">
                    <div style="width: 60px; height: 60px; border-radius: 50%; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 0.5rem;">🍅</div>
                    <div style="font-size: 0.9rem; font-weight: 600;">Tomate</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Parental A</div>
                  </div>
                  <div style="font-size: 1.5rem; color: var(--primary-color);">×</div>
                  <div style="text-align: center;">
                    <div style="width: 60px; height: 60px; border-radius: 50%; background: var(--secondary-color); color: white; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin: 0 auto 0.5rem;">🥔</div>
                    <div style="font-size: 0.9rem; font-weight: 600;">Batata</div>
                    <div style="font-size: 0.75rem; color: var(--text-secondary);">Parental B</div>
                  </div>
                </div>
                <div style="border-left: 2px solid var(--primary-color); height: 30px;"></div>
                <div style="text-align: center;">
                  <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color: white; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 0.5rem;">🌱</div>
                  <div style="font-size: 1rem; font-weight: 600;">Híbrido F1</div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary);">87% sucesso previsto</div>
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
              <button class="btn btn-outline btn-small" style="flex: 1;">📱 Visualização 3D</button>
              <button class="btn btn-secondary btn-small" style="flex: 1;">💾 Exportar</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              📈 Gráfico de Performance
            </h3>
            <p class="card-description">Taxa de sucesso por tipo de cruzamento</p>
          </div>
          <div class="card-content">
            <div style="height: 300px; background: linear-gradient(135deg, #f8f9fa, #e9ecef); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem;">
              <div style="width: 100%; height: 200px; background: repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(45, 125, 50, 0.1) 35px, rgba(45, 125, 50, 0.1) 40px); position: relative; border-radius: var(--radius);">
                <div style="position: absolute; bottom: 0; left: 10%; width: 15%; height: 60%; background: var(--primary-color); border-radius: 4px 4px 0 0;"></div>
                <div style="position: absolute; bottom: 0; left: 30%; width: 15%; height: 80%; background: var(--secondary-color); border-radius: 4px 4px 0 0;"></div>
                <div style="position: absolute; bottom: 0; left: 50%; width: 15%; height: 45%; background: var(--accent-color); border-radius: 4px 4px 0 0;"></div>
                <div style="position: absolute; bottom: 0; left: 70%; width: 15%; height: 90%; background: var(--primary-light); border-radius: 4px 4px 0 0;"></div>
              </div>
              <div style="display: flex; justify-content: space-around; width: 100%; font-size: 0.8rem; color: var(--text-secondary);">
                <span>Solanaceae</span>
                <span>Poaceae</span>
                <span>Fabaceae</span>
                <span>Inter-família</span>
              </div>
            </div>
            <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
              <button class="btn btn-outline btn-small" style="flex: 1;">📊 Detalhes</button>
              <button class="btn btn-secondary btn-small" style="flex: 1;">📱 Interativo</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            🗺️ Mapa de Distribuição Climática
          </h3>
          <p class="card-description">Adaptabilidade das espécies por região</p>
        </div>
        <div class="card-content">
          <div style="height: 400px; background: linear-gradient(135deg, #E3F2FD, #BBDEFB); border-radius: var(--radius); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
            <!-- Simulação de mapa do Brasil -->
            <div style="width: 300px; height: 350px; background: var(--primary-color); opacity: 0.8; border-radius: 20px 20px 60px 20px; position: relative;">
              <!-- Pontos representando regiões -->
              <div style="position: absolute; top: 20%; left: 30%; width: 20px; height: 20px; background: var(--accent-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem;">🌽</div>
              <div style="position: absolute; top: 40%; left: 60%; width: 20px; height: 20px; background: var(--secondary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem;">🍅</div>
              <div style="position: absolute; top: 60%; left: 40%; width: 20px; height: 20px; background: #FF5722; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem;">🫘</div>
              <div style="position: absolute; top: 30%; left: 70%; width: 20px; height: 20px; background: #9C27B0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem;">🌾</div>
            </div>
            
            <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; background: rgba(255, 255, 255, 0.9); padding: 1rem; border-radius: var(--radius);">
              <h5 style="margin-bottom: 0.75rem;">Legenda de Adaptabilidade:</h5>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.8rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 12px; height: 12px; background: var(--accent-color); border-radius: 50%;"></div>
                  Alta adaptação
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 12px; height: 12px; background: var(--secondary-color); border-radius: 50%;"></div>
                  Média adaptação
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 12px; height: 12px; background: #FF5722; border-radius: 50%;"></div>
                  Baixa adaptação
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <div style="width: 12px; height: 12px; background: #9C27B0; border-radius: 50%;"></div>
                  Teste requerido
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderCollaboration() {
    return `
      <h2 style="margin-bottom: 2rem;">Colaboração e Comunidade</h2>

      <div class="grid grid-3" style="margin-bottom: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              👥 Pesquisadores Ativos
            </h3>
            <p class="card-description">832 membros online</p>
          </div>
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">👨‍🔬</div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">1,247</div>
            <div style="color: var(--text-secondary);">Pesquisadores Registrados</div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              📚 Estudos Compartilhados
            </h3>
            <p class="card-description">Este mês</p>
          </div>
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📄</div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--secondary-color);">89</div>
            <div style="color: var(--text-secondary);">Publicações Recentes</div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              🤝 Colaborações
            </h3>
            <p class="card-description">Projetos conjuntos</p>
          </div>
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔬</div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--accent-color);">34</div>
            <div style="color: var(--text-secondary);">Projetos Ativos</div>
          </div>
        </div>
      </div>

      <div class="grid grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              💬 Fórum de Discussões
            </h3>
            <p class="card-description">Últimas discussões da comunidade</p>
          </div>
          <div class="card-content">
            ${Array.from({ length: 6 }, (_, i) => {
              const topics = [
                'Otimização de cruzamentos em ambiente tropical',
                'Resistência a pragas em culturas de subsistência',
                'Análise genômica comparativa entre híbridos',
                'Sustentabilidade em melhoramento vegetal',
                'Bioética em modificação genética',
                'Protocolos de validação para novos cultivares'
              ];
              const authors = ['Dr. Silva', 'Dra. Santos', 'Prof. Oliveira', 'Dr. Costa', 'Dra. Lima'];
              return `
                <div style="padding: 1rem; border-bottom: 1px solid var(--border-color); ${i === 5 ? 'border-bottom: none;' : ''}">
                  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <h5 style="margin: 0; font-size: 0.95rem;">${topics[i]}</h5>
                    <span style="font-size: 0.8rem; color: var(--text-secondary); white-space: nowrap; margin-left: 1rem;">
                      ${faker.date.recent({ days: 7 }).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.85rem; color: var(--text-secondary);">
                      por ${faker.helpers.arrayElement(authors)}
                    </span>
                    <div style="display: flex; gap: 1rem; font-size: 0.8rem; color: var(--text-secondary);">
                      <span>💬 ${faker.number.int({ min: 3, max: 47 })}</span>
                      <span>👁️ ${faker.number.int({ min: 12, max: 234 })}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
            <div style="text-align: center; margin-top: 1.5rem;">
              <button class="btn btn-primary">📝 Nova Discussão</button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              📊 Compartilhar Resultados
            </h3>
            <p class="card-description">Publique seus experimentos</p>
          </div>
          <div class="card-content">
            <form>
              <div class="form-group">
                <label class="form-label">Título do Estudo</label>
                <input type="text" class="form-input" placeholder="Ex: Cruzamento Tomate × Batata - Resultados Preliminares" />
              </div>
              <div class="form-group">
                <label class="form-label">Categoria</label>
                <select class="form-select">
                  <option value="">Selecione uma categoria</option>
                  <option value="crossing">Cruzamentos</option>
                  <option value="genetics">Análise Genética</option>
                  <option value="climate">Adaptação Climática</option>
                  <option value="nutrition">Valor Nutricional</option>
                  <option value="resistance">Resistência</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Resumo</label>
                <textarea class="form-textarea" placeholder="Descreva brevemente seus achados e metodologia..."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Anexar Dados</label>
                <input type="file" class="form-input" accept=".pdf,.csv,.xlsx" multiple />
              </div>
              <div class="form-group">
                <label style="display: flex; align-items: center; gap: 0.5rem;">
                  <input type="checkbox" />
                  Permitir colaboração aberta
                </label>
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%;">
                🚀 Publicar Estudo
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top: 2rem;">
        <div class="card-header">
          <h3 class="card-title">
            🏆 Projetos em Destaque
          </h3>
          <p class="card-description">Iniciativas colaborativas de sucesso</p>
        </div>
        <div class="card-content">
          <div class="grid grid-3">
            ${Array.from({ length: 3 }, (_, i) => {
              const projects = [
                {
                  title: 'Resistência à Seca no Nordeste',
                  desc: 'Desenvolvimento de variedades adaptadas ao clima semiárido',
                  participants: 23,
                  progress: 78,
                  icon: '🌵'
                },
                {
                  title: 'Biofortificação Nutricional',
                  desc: 'Aumento do valor nutricional em culturas básicas',
                  participants: 31,
                  progress: 45,
                  icon: '🥬'
                },
                {
                  title: 'Culturas Urbanas Sustentáveis',
                  desc: 'Adaptação para agricultura urbana e vertical',
                  participants: 18,
                  progress: 92,
                  icon: '🏙️'
                }
              ];
              const project = projects[i];
              return `
                <div style="padding: 1.5rem; border: 1px solid var(--border-color); border-radius: var(--radius);">
                  <div style="text-align: center; margin-bottom: 1rem;">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${project.icon}</div>
                    <h4 style="margin-bottom: 0.5rem;">${project.title}</h4>
                    <p style="font-size: 0.9rem; color: var(--text-secondary);">${project.desc}</p>
                  </div>
                  <div style="margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                      <span style="font-size: 0.9rem;">Progresso</span>
                      <span style="font-size: 0.9rem; font-weight: 600;">${project.progress}%</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${project.progress}%"></div>
                    </div>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <span style="font-size: 0.9rem; color: var(--text-secondary);">
                      👥 ${project.participants} participantes
                    </span>
                  </div>
                  <button class="btn btn-outline btn-small" style="width: 100%;">
                    🤝 Participar
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderSafety() {
    return `
      <h2 style="margin-bottom: 2rem;">Biossegurança e Ética</h2>

      <div class="grid grid-3" style="margin-bottom: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              ✅ Aprovações Pendentes
            </h3>
            <p class="card-description">Aguardando revisão</p>
          </div>
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">⏳</div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--accent-color);">7</div>
            <div style="color: var(--text-secondary);">Cruzamentos em Análise</div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              🛡️ Protocolos Ativos
            </h3>
            <p class="card-description">Diretrizes implementadas</p>
          </div>
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📋</div>
            <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color);">23</div>
            <div style="color: var(--text-secondary);">Protocolos Vigentes</div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              ⚠️ Alertas de Risco
            </h3>
            <p class="card-description">Monitoramento ativo</p>
          </div>
          <div class="card-content" style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🚨</div>
            <div style="font-size: 2rem; font-weight: 700; color: #F44336;">2</div>
            <div style="color: var(--text-secondary);">Alertas Ativos</div>
          </div>
        </div>
      </div>

      <div class="grid grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              📋 Avaliação de Risco
            </h3>
            <p class="card-description">Análise para novos cruzamentos</p>
          </div>
          <div class="card-content">
            <form>
              <div class="form-group">
                <label class="form-label">ID do Cruzamento</label>
                <input type="text" class="form-input" placeholder="Ex: CR-2024-001" />
              </div>
              <div class="form-group">
                <label class="form-label">Tipo de Análise</label>
                <select class="form-select">
                  <option value="">Selecione o tipo</option>
                  <option value="environmental">Impacto Ambiental</option>
                  <option value="food-safety">Segurança Alimentar</option>
                  <option value="genetic-stability">Estabilidade Genética</option>
                  <option value="allergenicity">Alergenicidade</option>
                  <option value="toxicity">Toxicidade</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Observações Especiais</label>
                <textarea class="form-textarea" placeholder="Descreva fatores de risco específicos..."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Anexar Documentos</label>
                <input type="file" class="form-input" accept=".pdf,.doc,.docx" multiple />
              </div>
              <button type="submit" class="btn btn-primary" style="width: 100%;">
                🔍 Iniciar Avaliação
              </button>
            </form>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">
              📊 Relatórios de Conformidade
            </h3>
            <p class="card-description">Status de aprovações recentes</p>
          </div>
          <div class="card-content">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Cruzamento</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  ${Array.from({ length: 8 }, (_, i) => {
                    const statuses = [
                      { label: 'Aprovado', color: 'var(--primary-color)' },
                      { label: 'Pendente', color: 'var(--accent-color)' },
                      { label: 'Reprovado', color: '#F44336' },
                      { label: 'Em Revisão', color: 'var(--secondary-color)' }
                    ];
                    const types = ['Ambiental', 'Alimentar', 'Genética', 'Alergia'];
                    const status = faker.helpers.arrayElement(statuses);
                    return `
                      <tr>
                        <td>CR-${String(2024000 + i).slice(-3)}</td>
                        <td>${faker.helpers.arrayElement(types)}</td>
                        <td><span class="tag" style="background: ${status.color}; color: white;">${status.label}</span></td>
                        <td>${faker.date.recent({ days: 30 }).toLocaleDateString('pt-BR')}</td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top: 2rem;">
        <div class="card-header">
          <h3 class="card-title">
            📜 Diretrizes e Protocolos
          </h3>
          <p class="card-description">Normas de biossegurança e ética em pesquisa</p>
        </div>
        <div class="card-content">
          <div class="grid grid-2">
            <div>
              <h5 style="margin-bottom: 1rem; color: var(--primary-color);">🌱 Protocolos de Melhoramento</h5>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius); margin-bottom: 0.5rem;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Protocolo de Cruzamento Interespecífico</div>
                  <div style="font-size: 0.9rem; color: var(--text-secondary);">Diretrizes para cruzamentos entre espécies diferentes</div>
                  <div style="margin-top: 0.5rem;">
                    <button class="btn btn-outline btn-small">📄 Visualizar</button>
                  </div>
                </li>
                <li style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius); margin-bottom: 0.5rem;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Avaliação de Estabilidade Genética</div>
                  <div style="font-size: 0.9rem; color: var(--text-secondary);">Testes obrigatórios para novos híbridos</div>
                  <div style="margin-top: 0.5rem;">
                    <button class="btn btn-outline btn-small">📄 Visualizar</button>
                  </div>
                </li>
                <li style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius); margin-bottom: 0.5rem;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Monitoramento Ambiental</div>
                  <div style="font-size: 0.9rem; color: var(--text-secondary);">Impacto em ecossistemas nativos</div>
                  <div style="margin-top: 0.5rem;">
                    <button class="btn btn-outline btn-small">📄 Visualizar</button>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h5 style="margin-bottom: 1rem; color: var(--secondary-color);">⚖️ Diretrizes Éticas</h5>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius); margin-bottom: 0.5rem;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Consentimento Informado</div>
                  <div style="font-size: 0.9rem; color: var(--text-secondary);">Transparência em pesquisas com comunidades</div>
                  <div style="margin-top: 0.5rem;">
                    <button class="btn btn-outline btn-small">📄 Visualizar</button>
                  </div>
                </li>
                <li style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius); margin-bottom: 0.5rem;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Propriedade Intelectual</div>
                  <div style="font-size: 0.9rem; color: var(--text-secondary);">Direitos sobre variedades desenvolvidas</div>
                  <div style="margin-top: 0.5rem;">
                    <button class="btn btn-outline btn-small">📄 Visualizar</button>
                  </div>
                </li>
                <li style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius); margin-bottom: 0.5rem;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Compartilhamento de Dados</div>
                  <div style="font-size: 0.9rem; color: var(--text-secondary);">Políticas de acesso aberto à informação</div>
                  <div style="margin-top: 0.5rem;">
                    <button class="btn btn-outline btn-small">📄 Visualizar</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(45, 125, 50, 0.05); border-radius: var(--radius); border-left: 4px solid var(--primary-color);">
            <h5 style="margin-bottom: 1rem; color: var(--primary-color);">📞 Comitê de Ética e Biossegurança</h5>
            <p style="margin-bottom: 1rem; color: var(--text-secondary);">
              Para dúvidas sobre protocolos ou aprovações, entre em contato com nosso comitê especializado.
            </p>
            <div style="display: flex; gap: 1rem;">
              <button class="btn btn-primary">📧 Contatar Comitê</button>
              <button class="btn btn-outline">📅 Agendar Reunião</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    
    // Atualizar navegação
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`button[onclick="app.switchTab('${tabId}')"]`).classList.add('active');
    
    // Atualizar conteúdo
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
  }

  showNotifications() {
    alert('📬 Notificações:\n\n' + this.notifications.map(n => `• ${n.message}`).join('\n\n'));
  }

  showAddSpeciesForm() {
    alert('🌱 Formulário de cadastro de nova espécie seria aberto aqui.\n\nEsta funcionalidade incluiria campos para:\n• Nome científico\n• Família botânica\n• Características genéticas\n• Dados fenotípicos\n• Condições de cultivo');
  }

  runSimulation() {
    const loading = document.createElement('div');
    loading.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
        <div style="background: white; padding: 2rem; border-radius: var(--radius); text-align: center;">
          <div class="loading">
            <div class="spinner"></div>
            Executando simulação...
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(loading);

    setTimeout(() => {
      document.body.removeChild(loading);
      alert('✅ Simulação concluída!\n\n🧬 Resultado: Taxa de sucesso de 87.3%\n🌱 Características preditas: Alta produtividade, resistência a seca\n⚠️ Análise de biossegurança: Aprovada');
    }, 3000);
  }

  bindEvents() {
    // Adicionar event listeners aqui se necessário
  }
}

// Inicializar aplicação
const app = new PlantGeneticsApp();

// Expor para uso global
window.app = app;
