import { Request, Response, NextFunction } from 'express';

export const setCreatorAndModifier = (req: Request, res: Response, next: NextFunction): void => {
  // Kullanıcının kimliğini kimlik doğrulama sisteminizden alın (Örneğin, JWT token'dan).
  // Bu örnekte, kimlik doğrulamanın zaten yapıldığını ve `req.user` içinde kullanıcı bilgilerinin bulunduğunu varsayıyoruz.
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  // Req.body'ye creatorId ve modifierId ekleyin
  req.body.creatorId = userId;
  req.body.modifierId = userId;

  next();
};
