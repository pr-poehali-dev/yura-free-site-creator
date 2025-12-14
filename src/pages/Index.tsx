import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const CORRECT_CODE = 'HDHSHSDUXUWJWJ';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([]);
  const [userInput, setUserInput] = useState('');
  const [projects, setProjects] = useState([
    { id: 1, name: 'Магазин игрушек', status: 'active', url: 'toyshop.site' },
    { id: 2, name: 'Лендинг для психолога', status: 'draft', url: '' },
  ]);
  const { toast } = useToast();

  const handleAuth = () => {
    if (code === CORRECT_CODE) {
      setIsAuthenticated(true);
      toast({
        title: '🚀 Добро пожаловать!',
        description: 'Вы успешно вошли в ЮРА БЕСПЛАТНО',
      });
    } else {
      toast({
        title: '❌ Неверный код',
        description: 'Проверьте код доступа и попробуйте снова',
        variant: 'destructive',
      });
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setChatMessages([...chatMessages, { role: 'user', text: userInput }]);
    
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: '🚀 Отлично! Я создам для вас сайт. Опишите подробнее, какие разделы и функции вам нужны?'
        }
      ]);
    }, 1000);

    setUserInput('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0f2e] via-[#2d1b4e] to-[#0f1419] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(155,135,245,0.1),transparent_50%)]" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur-xl border-primary/20 shadow-2xl animate-fade-in relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-block p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl animate-glow">
              <Icon name="Rocket" size={48} className="text-white" />
            </div>
            
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
                ЮРА БЕСПЛАТНО
              </h1>
              <p className="text-muted-foreground">Создавай сайты через ИИ</p>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Введите код доступа"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                className="bg-background/50 border-primary/30 focus:border-primary"
              />
              
              <Button
                onClick={handleAuth}
                className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300 font-semibold text-lg py-6"
              >
                <Icon name="Lock" className="mr-2" size={20} />
                Войти
              </Button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="Shield" size={14} />
              <span>Защищённый доступ</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] via-[#2d1b4e] to-[#0f1419]">
      <nav className="border-b border-primary/20 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
              <Icon name="Rocket" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ЮРА БЕСПЛАТНО
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Icon name="Bell" size={18} />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Icon name="Settings" size={18} />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card/50 backdrop-blur-sm border border-primary/20 p-1.5">
            <TabsTrigger value="home" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="constructor" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
              <Icon name="Wand2" size={16} className="mr-2" />
              Конструктор
            </TabsTrigger>
            <TabsTrigger value="sites" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
              <Icon name="FolderOpen" size={16} className="mr-2" />
              Мои сайты
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
              <Icon name="Layout" size={16} className="mr-2" />
              Шаблоны
            </TabsTrigger>
            <TabsTrigger value="docs" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
              <Icon name="BookOpen" size={16} className="mr-2" />
              Документация
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Создай сайт за минуты</h2>
                  <p className="text-muted-foreground">Опиши идею — получи готовый сайт</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-gradient-to-br from-accent to-secondary rounded-full animate-pulse opacity-20" />
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'Zap', title: 'Мгновенно', desc: 'Сайт за 2-3 минуты' },
                { icon: 'Sparkles', title: 'ИИ-ассистент', desc: 'Юра всё сделает сам' },
                { icon: 'Globe', title: 'Публикация', desc: 'Сразу в интернет' },
              ].map((feature, i) => (
                <Card key={i} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
                  <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl w-fit mb-4">
                    <Icon name={feature.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="font-semibold text-xl mb-4">🚀 Быстрый старт</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</span>
                  <span>Перейди в раздел "Конструктор"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</span>
                  <span>Опиши свой сайт простыми словами</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">3</span>
                  <span>Получи готовый сайт с ссылкой</span>
                </li>
              </ol>
            </Card>
          </TabsContent>

          <TabsContent value="constructor" className="animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                  <Icon name="Wand2" size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">ИИ Конструктор</h2>
              </div>

              <div className="space-y-4 mb-6 h-96 overflow-y-auto p-4 bg-background/30 rounded-xl border border-primary/10">
                {chatMessages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center space-y-3">
                      <Icon name="MessageSquare" size={48} className="mx-auto opacity-30" />
                      <p>Опишите, какой сайт вы хотите создать</p>
                    </div>
                  </div>
                ) : (
                  chatMessages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-primary to-secondary text-white'
                          : 'bg-card border border-primary/20'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Например: Сделай сайт для кофейни с меню и контактами"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-background/50 border-primary/30"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sites" className="animate-fade-in">
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl">
                        <Icon name="Globe" size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {project.status === 'active' ? `🟢 ${project.url}` : '🟡 Черновик'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-primary/30">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                      <Button variant="outline" size="sm" className="border-primary/30">
                        <Icon name="ExternalLink" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Лендинг', icon: 'FileText' },
                { name: 'Интернет-магазин', icon: 'ShoppingCart' },
                { name: 'Блог', icon: 'BookOpen' },
                { name: 'Портфолио', icon: 'Briefcase' },
                { name: 'Визитка', icon: 'CreditCard' },
                { name: 'Квиз', icon: 'HelpCircle' },
              ].map((template, i) => (
                <Card key={i} className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:scale-105 cursor-pointer">
                  <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-xl w-fit mb-4">
                    <Icon name={template.icon as any} size={32} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="docs" className="animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h2 className="text-2xl font-bold mb-6">📚 Документация</h2>
              <div className="space-y-4">
                {[
                  { title: 'Как создать первый сайт', icon: 'Rocket' },
                  { title: 'Работа с конструктором', icon: 'Wand2' },
                  { title: 'Публикация и домены', icon: 'Globe' },
                  { title: 'Интеграции и API', icon: 'Plug' },
                ].map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-background/30 rounded-xl hover:bg-background/50 transition-all cursor-pointer">
                    <Icon name={doc.icon as any} size={20} className="text-primary" />
                    <span>{doc.title}</span>
                    <Icon name="ChevronRight" size={16} className="ml-auto text-muted-foreground" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
