import { container } from 'tsyringe';

import { IHashProvider } from './HashProvider/models/IHashProvider';
import BcrtyptHashProvider from './HashProvider/implementations/BcryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcrtyptHashProvider);
