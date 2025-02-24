import { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import PageTitle from '@/components/PageTitle';

export default function FAQScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>();
  const theme = useColorScheme() ?? 'light';

  const faq = [
    {
      title: '1. Como funciona a autenticação via SMS?',
      content:
        'Após inserir seu número de celular, você receberá um código de verificação por SMS. Digite esse código no aplicativo para fazer login. Isso garante que apenas usuários autenticados possam acessar determinadas funcionalidades do aplicativo.',
    },
    {
      title: '2. Como posso marcar um ponto de alagamento?',
      content:
        'Para marcar um ponto de alagamento: \n\n 1. Acesse o mapa interativo. \n 2. Selecione o local onde ocorreu o alagamento. \n 3. Envie uma imagem que comprove o alagamento. \n 4. Escolha o nível de gravidade (leve, moderado ou interditado). \n 5. Confirme sua localização, caso ainda não tenha compartilhado. \n\n Após enviar, você verá uma mensagem informando que sua marcação está em análise.',
    },
    {
      title: '3. Como posso visualizar os pontos de alagamento registrados?',
      content:
        'O aplicativo exibe todos os pontos de alagamento registrados em tempo real no mapa interativo. Você pode clicar em cada ponto para visualizar informações detalhadas, como data da marcação, nível de gravidade e fotos enviadas pelos usuários.',
    },
    {
      title:
        '4. O que acontece quando recebo um alerta sobre um ponto de alagamento?',
      content:
        "Quando você estiver próximo a um ponto de alagamento, receberá um alerta perguntando se o local ainda está alagado. Você pode responder 'Sim' ou 'Não'. Sua resposta será registrada e ajudará a manter as informações atualizadas.",
    },
    {
      title: '5. Como posso visualizar meu histórico de envios?',
      content:
        'Você pode acessar a tela de histórico no aplicativo, onde encontrará uma lista de todas as suas marcações. Cada entrada inclui a data e hora do envio, bem como o status da análise (aprovado, rejeitado ou pendente).',
    },
    {
      title: '6. O que são notificações e como funcionam?',
      content:
        'As notificações são mensagens enviadas pelo administrador do sistema sobre condições climáticas adversas ou áreas em risco de alagamento. Você poderá visualizar essas notificações diretamente no aplicativo.',
    },
    {
      title: '7. Como posso relatar um problema técnico ou fornecer feedback?',
      content:
        'Se você encontrar algum problema técnico ou tiver sugestões, pode acessar este formulário: link. Aqui, você poderá enviar seu feedback ou relatar problemas diretamente à equipe responsável.',
    },
    {
      title:
        '8. O que devo fazer se não receber o código de verificação por SMS?',
      content:
        'Se você não receber o código de verificação, verifique se o número de celular informado está correto e se você tem sinal. Caso o problema persista, tente solicitar o código novamente. Se ainda assim não funcionar, entre em contato com o suporte técnico.',
    },
    {
      title: '9. O aplicativo é gratuito?',
      content:
        'Sim, o aplicativo é gratuito para download e uso. No entanto, é importante que você tenha acesso a dados móveis ou Wi-Fi para utilizar todas as funcionalidades.',
    },
  ];

  return (
    <>
      <PageTitle text="Perguntas Frequentes" backButton helpButton={false} />
      <ParallaxScrollView>
        <ThemedView style={styles.container}>
          {faq.map((item, index) => (
            <ThemedView
              key={index}
              style={[
                styles.accordionContainer,
                {
                  borderColor: theme === 'light' ? '#BDBDBD' : '#444',
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.accordionHeader,
                  { backgroundColor: theme === 'light' ? '#BDBDBD' : '#555' },
                ]}
                onPress={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
              </TouchableOpacity>
              {openIndex === index && (
                <ThemedText
                  style={[
                    styles.accordionContent,
                    { backgroundColor: theme === 'light' ? '#F5F5F5' : '#333' },
                  ]}
                >
                  {item.content}
                </ThemedText>
              )}
            </ThemedView>
          ))}
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
    paddingBottom: 100,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  accordionContainer: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 5,
    overflow: 'hidden',
  },
  accordionHeader: {
    backgroundColor: '#BDBDBD',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  accordionContent: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    textAlign: 'auto',
  },
});
