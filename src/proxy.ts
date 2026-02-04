import { i18nRouter } from 'next-i18n-router';
import { NextRequest } from 'next/server';
import i18nConfig from '../i18nConfig';

/**
 * Proxy function to replace deprecated middleware
 */
export function proxy(request: NextRequest) {
	// i18nRouter already returns a NextResponse internally
	return i18nRouter(request, i18nConfig);
}

/**
 * Apply this proxy only to app directory files (excluding API, static, _next)
 */
export const config = {
	matcher: '/((?!api|static|.*\\..*|_next).*)',
};
