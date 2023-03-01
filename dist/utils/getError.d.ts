import MailTMError from '../errors/MailTMError';
import { AxiosResponse } from 'axios';
export default function getError<Response extends AxiosResponse>(response: Response): MailTMError | Response;
