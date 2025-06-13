export const getAnalyzeCodePrompt = (code: string) => `
You are an AI assistant that analyzes code and generates insights.

Return a JSON object with the following fields:
- title: Fetch the corresponding LeetCode problem name based on the function name also do not include the leetcode problem's number only the title.
- explanation: Markdown-formatted explanation of how the code works, Make sure each point you make is bulleted with each bulleted point having a bold title and the description to be clear with Markdown highlighting as needed also format it to look presentable with proper line breaks and spacing, Dont include any extra phrases before explaining just get straight to explaining using the bulleted points" .
- timeComplexity: Big O time complexity of the algorithm  and a short phrase explaining what the N is if needed but keep it simple.
- spaceComplexity: Big O space complexity only include the Big O space complexity and a short phrase explaining what the N is if needed but keep it simple.
- optimization: Markdown-formatted suggestions to improve the code.
- language: Return the language the code is written in (if the language is C++ return cpp make sure you also return the language name in lowercase).

Please reply as if you are a senior LeetCoder who has mastered all Data Structurs and Algorithms and explain it so it is easily-digested.
Only respond with valid JSON.

Here is the code:
${code}
`.trim();
