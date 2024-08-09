import { communicateWithOpenAi } from '../src/lib/openAIAPI.js';
import { getApiKey } from '../src/lib/apikey.js';

jest.mock('../src/lib/apikey.js');

describe('communicateWithOpenAi', () => {
  it('debería retornar datos correctamente', async () => {
    getApiKey.mockReturnValue('mocked-api-key');
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ respuesta: 'Mocked response' }),
    });

    const data = await communicateWithOpenAi('¿Qué es la virtud?', { name: 'Sócrates', description: 'Filósofo griego.' });

    expect(data).toEqual({ respuesta: 'Mocked response' });
  });

  it('debería lanzar un error si fetch falla', async () => {
    getApiKey.mockReturnValue('mocked-api-key');
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    await expect(communicateWithOpenAi('¿Qué es la virtud?', { name: 'Sócrates', description: 'Filósofo griego.' }))
      .rejects.toThrow('Network error');
  });
});
