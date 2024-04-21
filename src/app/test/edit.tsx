'use client';
import {
	EditorRoot,
	EditorContent,
	EditorCommand,
	EditorCommandItem,
	EditorCommandList,
	type JSONContent,
	EditorBubble,
	EditorCommandEmpty,
} from 'novel';
import { handleCommandNavigation } from 'novel/extensions';

import { defaultExtensions } from './extensions';
import { slashCommand, suggestionItems } from './slash-command';
import TextButtons from './selectors/text-buttons';
import { NodeSelector } from './selectors/node-selector';
import { useState } from 'react';

const extensions = [...defaultExtensions, slashCommand];

interface Props {
	initialContent: JSONContent;
	onChange: (val: JSONContent) => void;
}

const Editor = ({ initialContent, onChange }: Props) => {
	const [openNode, setOpenNode] = useState(false);

	return (
		<EditorRoot>
			<EditorContent
				{...(initialContent && { initialContent })}
				className="border p-4 rounded-xl"
				extensions={extensions}
				editorProps={{
					handleDOMEvents: {
						keydown: (_view, event) => handleCommandNavigation(event),
					},
					attributes: {
						class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
					},
				}}
				onUpdate={({ editor }) => {
					onChange(editor.getJSON());
				}}
			>
				<EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
					<EditorCommandEmpty className="px-2 text-muted-foreground">
						No results
					</EditorCommandEmpty>
					<EditorCommandList>
						{suggestionItems.map((item) => (
							<EditorCommandItem
								key={item.title}
								value={item.title}
								onCommand={(val) => item.command?.(val)}
								className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
									{item.icon}
								</div>
								<div>
									<p className="font-medium">{item.title}</p>
									<p className="text-xs text-muted-foreground">
										{item.description}
									</p>
								</div>
							</EditorCommandItem>
						))}
					</EditorCommandList>
				</EditorCommand>
				<EditorBubble
					tippyOptions={{
						placement: 'top',
					}}
					className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
				>
					<NodeSelector
						open={openNode}
						onOpenChange={setOpenNode}
					/>
					<TextButtons />
				</EditorBubble>
			</EditorContent>
		</EditorRoot>
	);
};

export default Editor;
