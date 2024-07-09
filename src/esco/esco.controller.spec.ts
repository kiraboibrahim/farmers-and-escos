import { Test, TestingModule } from '@nestjs/testing';
import { EscoController } from './esco.controller';
import { EscoService } from './esco.service';

describe('EscoController', () => {
  let controller: EscoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EscoController],
      providers: [EscoService],
    }).compile();

    controller = module.get<EscoController>(EscoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
