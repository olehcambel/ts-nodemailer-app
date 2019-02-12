interface Opts {
  data?: any;
  message?: string;
}

interface Output {
  data: any;
  message: string;
  statusCode: number;
  error: null;
}

export const onSuccess = ({ data, message }: Opts = {}): Output => ({
  statusCode: 200,
  message: message || 'ok',
  data: data || null,
  error: null,
});
