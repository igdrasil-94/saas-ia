import { Injectable } from '@nestjs/common';

export interface ContentGeneration {
  id: number;
  type: 'linkedin' | 'twitter' | 'article' | 'email';
  topic: string;
  content: string;
  userId: number;
  createdAt: Date;
}

const contents: ContentGeneration[] = [];

@Injectable()
export class ContentService {
  async generate(type: string, topic: string, userId: number) {
    // Mock AI generation - replace with OpenAI API in production
    const mockContent = `Voici un contenu ${type} optimisé sur le sujet: ${topic}. 
    \n\nL'intelligence artificielle transforme le marketing digital en permettant une personnalisation 
    à grande échelle et une automatisation intelligente des campagnes.`;

    const content: ContentGeneration = {
      id: contents.length + 1,
      type: type as any,
      topic,
      content: mockContent,
      userId,
      createdAt: new Date(),
    };

    contents.push(content);
    return content;
  }

  async findAllByUser(userId: number) {
    return contents.filter((c) => c.userId === userId);
  }

  async findById(id: number) {
    return contents.find((c) => c.id === id);
  }
}
