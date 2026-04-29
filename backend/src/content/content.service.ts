import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, ContentType, ContentStatus } from '@prisma/client';

const prisma = new PrismaClient();

interface GenerateContentDto {
  title: string;
  type: ContentType;
  prompt: string;
  userId: string;
}

@Injectable()
export class ContentService {
  async generateContent(data: GenerateContentDto) {
    // TODO: Intégrer OpenAI ici pour générer le contenu
    const generatedContent = `Contenu généré pour: ${data.prompt}`;

    return prisma.content.create({
      data: {
        title: data.title,
        content: generatedContent,
        type: data.type,
        userId: data.userId,
        creditsUsed: 1,
      },
    });
  }

  async findAllByUser(userId: string) {
    return prisma.content.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const content = await prisma.content.findFirst({
      where: { id, userId },
    });
    if (!content) {
      throw new NotFoundException('Content not found');
    }
    return content;
  }

  async updateStatus(id: string, userId: string, status: ContentStatus) {
    return prisma.content.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: string, userId: string) {
    const content = await prisma.content.findFirst({
      where: { id, userId },
    });
    if (!content) {
      throw new NotFoundException('Content not found');
    }
    return prisma.content.delete({ where: { id } });
  }
}
