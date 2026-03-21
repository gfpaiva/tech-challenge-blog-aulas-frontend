import { Meta, StoryObj } from '@storybook/react';
import { PostContent } from './PostContent';

const meta: Meta<typeof PostContent> = {
  title: 'Features/Posting/PostContent',
  component: PostContent,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof PostContent>;

export const Default: Story = {
  args: {
    content: `A física quântica é o estudo da matéria e da energia no nível mais fundamental.

Ela busca descrever as propriedades e comportamentos dos blocos de construção da natureza.

Muitos fenômenos quânticos examinam objetos muito pequenos, como elétrons e fótons. Estes fenômenos quânticos estão ao nosso redor.

Eles agem em cada escala e, no entanto, podemos não ser capazes de detectá-los facilmente em objetos maiores.`,
  },
};
