'use client';

import React, { forwardRef } from 'react';
import {
	MDXEditor,
	headingsPlugin,
	listsPlugin,
	quotePlugin,
	thematicBreakPlugin,
	markdownShortcutPlugin,
	linkPlugin,
	linkDialogPlugin,
	tablePlugin,
	codeBlockPlugin,
	codeMirrorPlugin,
	toolbarPlugin,
	UndoRedo,
	BoldItalicUnderlineToggles,
	BlockTypeSelect,
	CreateLink,
	InsertTable,
	InsertThematicBreak,
	ListsToggle,
	Separator,
	CodeToggle,
	InsertCodeBlock,
	type MDXEditorMethods,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface PromptMarkdownEditorProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

export const PromptMarkdownEditor = forwardRef<MDXEditorMethods, PromptMarkdownEditorProps>(
	({ value, onChange, placeholder }, ref) => {
		return (
			<div className='mdx-editor-wrapper border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden'>
				<MDXEditor
					ref={ref}
					markdown={value}
					onChange={onChange}
					placeholder={placeholder || 'Enter your prompt in markdown format...'}
					contentEditableClassName='prose prose-sm dark:prose-invert max-w-none min-h-[400px] p-4'
					plugins={[
						headingsPlugin(),
						listsPlugin(),
						quotePlugin(),
						thematicBreakPlugin(),
						linkPlugin(),
						linkDialogPlugin(),
						tablePlugin(),
						codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
						codeMirrorPlugin({
							codeBlockLanguages: {
								txt: 'Plain Text',
								js: 'JavaScript',
								jsx: 'JavaScript (React)',
								ts: 'TypeScript',
								tsx: 'TypeScript (React)',
								python: 'Python',
								json: 'JSON',
								css: 'CSS',
								html: 'HTML',
								bash: 'Bash',
								sql: 'SQL',
							},
						}),
						markdownShortcutPlugin(),
						toolbarPlugin({
							toolbarContents: () => (
								<>
									<UndoRedo />
									<Separator />
									<BoldItalicUnderlineToggles />
									<CodeToggle />
									<Separator />
									<BlockTypeSelect />
									<Separator />
									<ListsToggle />
									<Separator />
									<CreateLink />
									<InsertTable />
									<InsertThematicBreak />
									<Separator />
									<InsertCodeBlock />
								</>
							),
						}),
					]}
				/>
			</div>
		);
	}
);

PromptMarkdownEditor.displayName = 'PromptMarkdownEditor';
