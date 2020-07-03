import cache from "memory-cache";
import { Handler } from "express";

const fn: Handler = (req, res, next) => {
  const prefix = "http";
  const key = `${prefix}${req.url}`;
  const cachedValue = cache.get(key);

  if (cachedValue) {
    res.send(cachedValue);
    return;
  } else {
    const cachedSend = res.send;

    res.send = ((body?: any) => {
      if (res.statusCode < 300) cache.put(key, body, 1000 * 60 * 61);

      cachedSend.bind(res)(body);
    }) as any;

    next();
  }
};

export default fn;
