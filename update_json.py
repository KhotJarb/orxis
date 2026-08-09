import json
import os

locales = {
    'en': {
        'whyExcels': {
            'title': 'Why Claude Excels',
            'para1': {
                'before': 'Anthropic trained Claude using ',
                'strong1': 'Constitutional AI (CAI)',
                'mid': ' — a process in which the model was given a set of principles and asked to critique and revise its own outputs against them. This training was conducted using ',
                'strong2': 'XML-tagged feedback pairs',
                'after': ': the model was shown its reasoning inside structured XML blocks and learned to treat those blocks as first-class cognitive artifacts, not decorative markup.'
            },
            'para2': {
                'before': 'The practical consequence is that Claude processes the ',
                'mid': ' tags in your generated Section 3 as ',
                'strong': 'genuine internal reasoning directives',
                'after': '. It will follow the multi-point evaluation rubric inside the tags before constructing its visible response — creating a two-layer output where the hidden reasoning layer materially improves the quality of what the user sees.'
            },
            'cards': [
                {
                    'label': 'Section 3 — Cognitive Loop',
                    'note': 'XML tags processed as native reasoning scaffolds'
                },
                {
                    'label': 'Section 1 — Role & Identity',
                    'note': 'Strong persona adoption with constitutional grounding'
                },
                {
                    'label': 'Section 5 — Boundaries',
                    'note': 'Excellent constraint adherence from CAI training'
                },
                {
                    'label': 'Section 6 — Output Formatting',
                    'note': 'Strong Markdown structure compliance'
                }
            ]
        },
        'projects': {
            'title': 'Claude.ai Projects (Recommended)',
            'para': {
                'before': 'The best way to deploy your Master Instruction with Claude is through ',
                'strong1': 'Projects',
                'mid': ' on claude.ai. Projects give your instruction a permanent home — it is automatically prepended to every conversation you start inside the Project, without you having to paste it manually. This is particularly powerful with Claude because ',
                'strong2': '200K-token context window',
                'after': ' means your entire instruction history, including appended documents, fits with room to spare.'
            },
            'step1': {
                'title': 'Navigate to Projects',
                'before': 'Go to ',
                'mid1': ' and sign in. In the ',
                'strong': 'left sidebar',
                'mid2': ', click ',
                'after': '. If you don\'t see it, ensure you\'re on a Pro or Team plan — Projects require a paid account.'
            },
            'step2': {
                'title': 'Create a new Project',
                'before': 'Click ',
                'mid': ' (or the ',
                'after': ' button). Give it a descriptive name — e.g., "Research Analyst" or "Principal Engineer". This name helps you quickly identify which instruction set is active.'
            },
            'step3': {
                'title': 'Add project instructions',
                'before': 'Inside the Project view, click ',
                'after': ' (visible in the right-hand panel or at the top of the Project page). A full editor opens — paste your complete Master Instruction here. There is no character limit.'
            },
            'step4': {
                'title': 'Save and start a conversation',
                'before': 'Click ',
                'after': '. Every new conversation started inside this Project will automatically receive your Master Instruction as its system context. Claude will honor it for the entire session without any re-pasting.'
            },
            'callout': {
                'title': 'Projects Preserve Instructions Permanently',
                'before': 'Unlike pasting at the start of a chat, Project instructions are ',
                'strong': 'stored server-side indefinitely',
                'after': '. You can update them at any time by returning to the Project and editing the instructions field. Claude\'s 200K-token context window means your entire instruction — including all six sections — fits comfortably alongside thousands of turns of conversation history.'
            }
        },
        'directChat': {
            'title': 'Direct Chat Method',
            'para1': 'For quick tests, one-off sessions, or if you\'re on the free plan without access to Projects, you can paste the Master Instruction directly into a new Claude conversation. Claude will honor it for the entire session, no Projects setup required.',
            'para2': {
                'before': 'The workflow is simple: open a new chat, paste your complete Master Instruction as your ',
                'strong1': 'first message',
                'mid': ', send it, and then on your ',
                'strong2': 'second message',
                'after': ' send your actual request. Claude treats the first message as a context-setting primer and will operate within the defined persona and constraints from that point forward.'
            },
            'callout': {
                'title': 'Session-Scoped Only',
                'text': 'The direct chat method only persists for the duration of that specific conversation. If you start a new chat, you\'ll need to paste the instruction again. For repeated use of the same persona, Projects are strongly recommended over this method.'
            }
        },
        'xmlAdvantage': {
            'title': 'The XML Advantage',
            'para1': 'Section 3 of your generated instruction — The Cognitive Loop — uses XML tags as a structured internal reasoning scaffold. Here is what a typical Cognitive Loop block looks like and how Claude interprets it:',
            'para2': {
                'before': 'When Claude reads this block, it doesn\'t produce the ',
                'mid': ' XML in its output (unless explicitly instructed to). Instead, it uses the internal structure as a ',
                'strong': 'reasoning template',
                'after': ' — executing each sub-tag as a discrete thinking step before constructing its reply. The result is a response that has been implicitly evaluated against a 5-point rubric, checked for persona consistency, and verified against formatting rules — all before the user sees a single word.'
            },
            'callout': {
                'title': 'Add <thinking> Tags for Visible Reasoning',
                'before': 'On Claude 3.5 Sonnet and later, you can add ',
                'mid1': ' to your instruction to expose Claude\'s reasoning chain visibly in its output. Combine this with the Cognitive Loop for detailed transparency: ',
                'code': 'Before responding, show your reasoning inside <thinking> tags.',
                'after': ' This makes Claude\'s evaluation rubric auditable — ideal for high-stakes decisions or teaching contexts.'
            }
        },
        'apiIntegration': {
            'title': 'API Integration',
            'para1': {
                'before': 'For production applications, use the ',
                'strong': 'Anthropic Python SDK',
                'mid': ' to inject your Master Instruction as the ',
                'after': ' parameter. Anthropic\'s API treats the system prompt as a first-class parameter — not a message in the conversation array — which gives it the highest priority in the model\'s attention.'
            },
            'streaming': {
                'title': 'Streaming with Extended Thinking',
                'before': 'Claude 3.7 Sonnet supports ',
                'strong': 'extended thinking',
                'after': ' — a first-class API feature that gives Claude dedicated compute for deep reasoning before responding. This combines powerfully with your Cognitive Loop:'
            },
            'callout': {
                'title': 'Temperature Constraint for Extended Thinking',
                'before': 'When using Claude\'s extended thinking mode, Anthropic requires ',
                'after': '. This does not reduce instruction adherence — the extended thinking budget provides structured exploration, and the Cognitive Loop in your system instruction provides the evaluation rubric that guides it.'
            }
        },
        'next': 'Next',
        'nextLink': 'Gemini Guide →'
    },
    'th': {
        'whyExcels': {
            'title': 'ทำไม Claude ถึงโดดเด่น',
            'para1': {
                'before': 'Anthropic ฝึกสอน Claude ด้วยวิธี ',
                'strong1': 'Constitutional AI (CAI)',
                'mid': ' — ซึ่งเป็นกระบวนการที่โมเดลจะได้รับชุดหลักการและถูกขอให้วิจารณ์และแก้ไขผลลัพธ์ของตัวเองตามหลักการนั้นๆ การฝึกสอนนี้ทำโดยใช้ ',
                'strong2': 'XML-tagged feedback pairs',
                'after': ': โมเดลจะได้เห็นการใช้เหตุผลของตัวเองภายในบล็อก XML ที่มีโครงสร้าง และเรียนรู้ที่จะปฏิบัติต่อบล็อกเหล่านั้นเหมือนเป็นส่วนประกอบทางความคิดที่สำคัญ ไม่ใช่แค่มาร์กอัปสำหรับตกแต่ง'
            },
            'para2': {
                'before': 'ผลลัพธ์ในทางปฏิบัติคือ Claude จะประมวลผลแท็ก ',
                'mid': ' ใน Section 3 ที่คุณสร้างขึ้นให้เป็น ',
                'strong': 'คำสั่งให้คิดพิจารณาภายในอย่างแท้จริง',
                'after': ' มันจะทำตามเกณฑ์การประเมินหลายข้อที่อยู่ภายในแท็กก่อนที่จะสร้างผลลัพธ์ที่มองเห็นได้ — เกิดเป็นผลลัพธ์สองชั้นที่ชั้นการคิดซ่อนอยู่เบื้องหลังช่วยปรับปรุงคุณภาพของสิ่งที่ผู้ใช้เห็นได้อย่างมาก'
            },
            'cards': [
                {
                    'label': 'Section 3 — Cognitive Loop',
                    'note': 'แท็ก XML จะถูกประมวลผลเป็นโครงสร้างการใช้เหตุผลในตัว'
                },
                {
                    'label': 'Section 1 — Role & Identity',
                    'note': 'เข้าถึงบทบาทได้อย่างยอดเยี่ยมด้วยพื้นฐานแบบ Constitutional'
                },
                {
                    'label': 'Section 5 — Boundaries',
                    'note': 'ปฏิบัติตามข้อจำกัดได้อย่างดีเยี่ยมจากการฝึกฝนแบบ CAI'
                },
                {
                    'label': 'Section 6 — Output Formatting',
                    'note': 'ปฏิบัติตามโครงสร้าง Markdown อย่างเคร่งครัด'
                }
            ]
        },
        'projects': {
            'title': 'โปรเจกต์ Claude.ai (แนะนำ)',
            'para': {
                'before': 'วิธีที่ดีที่สุดในการนำ Master Instruction ของคุณไปใช้กับ Claude คือผ่าน ',
                'strong1': 'Projects',
                'mid': ' บน claude.ai Projects จะให้ที่อยู่ถาวรกับคำสั่งของคุณ — โดยมันจะถูกเพิ่มเข้าไปหน้าบทสนทนาทุกครั้งที่คุณเริ่มต้นใน Project อัตโนมัติ โดยที่คุณไม่ต้องคอยวางเอง นี่เป็นวิธีที่ทรงพลังมากกับ Claude เพราะมี ',
                'strong2': '200K-token context window',
                'after': ' หมายความว่าประวัติคำสั่งทั้งหมดของคุณ รวมถึงเอกสารที่แนบมา สามารถใส่เข้าไปได้สบายๆ และยังเหลือที่อีกมาก'
            },
            'step1': {
                'title': 'ไปที่ Projects',
                'before': 'ไปที่ ',
                'mid1': ' แล้วเข้าสู่ระบบ ใน ',
                'strong': 'แถบด้านซ้าย',
                'mid2': ' ให้คลิกที่ ',
                'after': ' หากคุณไม่เห็น ให้ตรวจสอบว่าคุณใช้แพ็กเกจ Pro หรือ Team — Projects ต้องใช้บัญชีแบบชำระเงิน'
            },
            'step2': {
                'title': 'สร้าง Project ใหม่',
                'before': 'คลิกที่ ',
                'mid': ' (หรือปุ่ม ',
                'after': ') ตั้งชื่อให้ชัดเจน — เช่น "นักวิเคราะห์วิจัย" หรือ "หัวหน้าวิศวกร" ชื่อนี้จะช่วยให้คุณระบุได้อย่างรวดเร็วว่าชุดคำสั่งไหนเปิดใช้อยู่'
            },
            'step3': {
                'title': 'เพิ่มคำสั่งโปรเจกต์',
                'before': 'ในหน้าต่าง Project คลิกที่ ',
                'after': ' (เห็นได้ที่แผงด้านขวาหรือด้านบนของหน้า Project) หน้าแก้ไขจะเปิดขึ้นมา — ให้วาง Master Instruction ของคุณทั้งหมดลงไปตรงนี้ ไม่มีจำกัดจำนวนตัวอักษร'
            },
            'step4': {
                'title': 'บันทึกและเริ่มบทสนทนา',
                'before': 'คลิกที่ ',
                'after': ' บทสนทนาใหม่ทุกครั้งที่เริ่มใน Project นี้จะได้รับ Master Instruction ของคุณเป็นระบบบริบท (System Context) โดยอัตโนมัติ Claude จะทำตามคำสั่งตลอดเซสชันโดยไม่ต้องวางซ้ำ'
            },
            'callout': {
                'title': 'Projects บันทึกคำสั่งไว้อย่างถาวร',
                'before': 'ต่างจากการวางที่จุดเริ่มต้นของแชท คำสั่งใน Project จะถูก ',
                'strong': 'จัดเก็บฝั่งเซิร์ฟเวอร์ไว้อย่างไม่มีกำหนด',
                'after': ' คุณสามารถอัปเดตคำสั่งเมื่อใดก็ได้โดยกลับไปที่ Project แล้วแก้ไขในช่องคำสั่ง Context window ขนาด 200K ของ Claude หมายความว่าคำสั่งของคุณทั้งหมด — รวมถึงทั้งหกส่วน — จะถูกใส่เข้าไปได้สบายๆ พร้อมกับประวัติการแชทอีกนับพันรอบ'
            }
        },
        'directChat': {
            'title': 'วิธีการแชทโดยตรง',
            'para1': 'สำหรับการทดสอบอย่างรวดเร็ว เซสชันแบบครั้งเดียวจบ หรือหากคุณอยู่ในแพลนฟรีที่ไม่มีสิทธิ์เข้าถึง Projects คุณสามารถวาง Master Instruction ลงไปในแชท Claude ใหม่ได้เลย Claude จะทำตามคำสั่งนั้นไปตลอดทั้งเซสชันโดยไม่ต้องตั้งค่า Projects',
            'para2': {
                'before': 'เวิร์กโฟลว์นี้ง่ายมาก: เปิดแชทใหม่ วาง Master Instruction ทั้งหมดของคุณเป็น ',
                'strong1': 'ข้อความแรก',
                'mid': ' แล้วส่ง จากนั้นใน ',
                'strong2': 'ข้อความที่สอง',
                'after': ' ค่อยส่งคำขอจริงๆ ของคุณ Claude จะถือว่าข้อความแรกเป็นการตั้งค่าบริบทและจะดำเนินการภายใต้บทบาทและข้อจำกัดที่กำหนดไว้ตั้งแต่จุดนั้นเป็นต้นไป'
            },
            'callout': {
                'title': 'จำกัดเฉพาะในเซสชันเท่านั้น',
                'text': 'วิธีการแชทโดยตรงจะคงอยู่เฉพาะในช่วงเวลาของบทสนทนานั้นเท่านั้น หากคุณเริ่มแชทใหม่ คุณจะต้องวางคำสั่งอีกครั้ง สำหรับการใช้งานบทบาทเดิมซ้ำๆ ขอแนะนำให้ใช้ Projects มากกว่าวิธีนี้'
            }
        },
        'xmlAdvantage': {
            'title': 'ข้อได้เปรียบของ XML',
            'para1': 'Section 3 ในคำสั่งของคุณที่สร้างขึ้น — The Cognitive Loop — ใช้แท็ก XML เป็นโครงสร้างสำหรับการให้เหตุผลภายใน นี่คือหน้าตาของบล็อก Cognitive Loop ทั่วไปและวิธีที่ Claude ตีความ:',
            'para2': {
                'before': 'เมื่อ Claude อ่านบล็อกนี้ มันจะไม่สร้างแท็ก XML ',
                'mid': ' ออกมาในผลลัพธ์ (เว้นแต่จะได้รับคำสั่งอย่างชัดเจน) แต่มันใช้โครงสร้างภายในนี้เป็น ',
                'strong': 'แม่แบบการใช้เหตุผล',
                'after': ' — โดยดำเนินการในแต่ละแท็กย่อยเป็นขั้นตอนการคิดแยกย่อยก่อนที่จะสร้างคำตอบ ผลลัพธ์คือคำตอบที่ผ่านการประเมินตามเกณฑ์ 5 ข้อโดยปริยาย ตรวจสอบความสอดคล้องของบทบาท และตรวจสอบกฎการจัดรูปแบบแล้ว — ทั้งหมดนี้ทำเสร็จก่อนที่ผู้ใช้จะเห็นข้อความแรกด้วยซ้ำ'
            },
            'callout': {
                'title': 'เพิ่มแท็ก <thinking> สำหรับแสดงการใช้เหตุผลให้เห็น',
                'before': 'บน Claude 3.5 Sonnet ขึ้นไป คุณสามารถเพิ่ม ',
                'mid1': ' ในคำสั่งของคุณเพื่อให้ Claude แสดงสายการคิดให้เห็นได้อย่างชัดเจนในผลลัพธ์ นำไปใช้คู่กับ Cognitive Loop เพื่อความโปร่งใสโดยละเอียด: ',
                'code': 'ก่อนตอบ ให้แสดงการใช้เหตุผลของคุณในแท็ก <thinking>',
                'after': ' สิ่งนี้ทำให้เกณฑ์การประเมินของ Claude สามารถตรวจสอบได้ — เหมาะสำหรับการตัดสินใจที่มีความเสี่ยงสูงหรือในบริบทของการสอน'
            }
        },
        'apiIntegration': {
            'title': 'การเชื่อมต่อ API',
            'para1': {
                'before': 'สำหรับแอปพลิเคชันใช้งานจริง ให้ใช้ ',
                'strong': 'Anthropic Python SDK',
                'mid': ' เพื่อป้อน Master Instruction ของคุณไปในพารามิเตอร์ ',
                'after': ' API ของ Anthropic จะมอง system prompt เป็นพารามิเตอร์ที่สำคัญที่สุด — ไม่ใช่แค่ข้อความหนึ่งในอาร์เรย์ของการสนทนา — ซึ่งจะได้รับความสำคัญสูงสุดในการรับรู้ของโมเดล'
            },
            'streaming': {
                'title': 'Streaming ด้วย Extended Thinking',
                'before': 'Claude 3.7 Sonnet รองรับฟีเจอร์ ',
                'strong': 'extended thinking',
                'after': ' — ซึ่งเป็นฟีเจอร์ API ระดับเฟิร์สคลาสที่มอบการประมวลผลให้ Claude สำหรับการคิดอย่างลึกซึ้งก่อนตอบ เมื่อนำมารวมกับ Cognitive Loop ของคุณ มันจะทรงพลังมาก:'
            },
            'callout': {
                'title': 'ข้อจำกัดด้าน Temperature สำหรับ Extended Thinking',
                'before': 'เมื่อใช้โหมด extended thinking ของ Claude ทาง Anthropic บังคับให้ใช้ ',
                'after': ' สิ่งนี้ไม่ได้ลดความแม่นยำในการทำตามคำสั่งลง — เพราะเวลาสำหรับการคิดที่เพิ่มขึ้นจะช่วยให้เกิดการสำรวจอย่างเป็นระบบ และ Cognitive Loop ในระบบของคุณก็ยังมีเกณฑ์ที่คอยชี้นำอยู่'
            }
        },
        'next': 'ถัดไป',
        'nextLink': 'คู่มือ Gemini →'
    },
    'zh': {
        'whyExcels': {
            'title': '为什么 Claude 如此出色',
            'para1': {
                'before': 'Anthropic 使用了 ',
                'strong1': 'Constitutional AI (CAI, 宪法式AI)',
                'mid': ' 技术来训练 Claude——在这个过程中，模型被赋予一套原则，并被要求根据这些原则来批评和修改自己的输出。这项训练使用了 ',
                'strong2': 'XML 标签反馈对',
                'after': '：模型在结构化的 XML 块中查看其推理过程，并学会将这些块视为一等思维组件，而不仅仅是装饰性的标记。'
            },
            'para2': {
                'before': '带来的实际影响是，Claude 会将你生成的 Section 3 中的 ',
                'mid': ' 标签视为 ',
                'strong': '真正的内部推理指令',
                'after': '。它会在构建可见回复之前，遵循标签内部的多点评估指标——从而创建出双层输出，其中隐藏的推理层会实质性地提高用户看到的输出质量。'
            },
            'cards': [
                {
                    'label': 'Section 3 — Cognitive Loop',
                    'note': 'XML 标签被作为原生推理脚手架进行处理'
                },
                {
                    'label': 'Section 1 — Role & Identity',
                    'note': '基于宪法式训练的强大人设带入能力'
                },
                {
                    'label': 'Section 5 — Boundaries',
                    'note': '源自 CAI 训练的极佳的约束遵循能力'
                },
                {
                    'label': 'Section 6 — Output Formatting',
                    'note': '强大的 Markdown 结构遵循能力'
                }
            ]
        },
        'projects': {
            'title': 'Claude.ai 项目 (推荐)',
            'para': {
                'before': '在 Claude 中部署你的 Master Instruction 最好的方法是通过 claude.ai 上的 ',
                'strong1': 'Projects (项目)',
                'mid': ' 功能。Projects 给你的指令提供了一个永久的居所——它会自动添加到你在该项目内开始的每一段对话前，无需你手动粘贴。这在 Claude 身上尤其强大，因为其 ',
                'strong2': '200K token 的上下文窗口',
                'after': ' 意味着你完整的指令历史（包括附加的文档）都能轻松容纳，且游刃有余。'
            },
            'step1': {
                'title': '导航至 Projects',
                'before': '前往 ',
                'mid1': ' 并登录。在',
                'strong': '左侧边栏',
                'mid2': '，点击 ',
                'after': '。如果没有看到该选项，请确保你使用的是 Pro 或 Team 计划——Projects 需要付费账户。'
            },
            'step2': {
                'title': '创建一个新项目',
                'before': '点击 ',
                'mid': ' (或 ',
                'after': ' 按钮)。给它起个描述性的名字——比如“研究分析师”或“首席工程师”。这个名字能帮助你快速识别当前激活的是哪套指令。'
            },
            'step3': {
                'title': '添加项目指令',
                'before': '在项目视图内，点击 ',
                'after': ' (在右侧面板或项目页面顶部可见)。会打开一个完整的编辑器——将你完整的 Master Instruction 粘贴到这里。这里没有字符数限制。'
            },
            'step4': {
                'title': '保存并开始对话',
                'before': '点击 ',
                'after': '。在这个项目内开始的每一次新对话，都会自动接收你的 Master Instruction 作为其系统上下文。Claude 会在整个会话中遵循它，无需重新粘贴。'
            },
            'callout': {
                'title': 'Projects 会永久保存指令',
                'before': '与在聊天开始时粘贴不同，Project 指令会 ',
                'strong': '在服务器端无限期存储',
                'after': '。你可以随时返回项目并编辑指令字段来更新它们。Claude 200K token 的上下文窗口意味着你完整的指令（包括全部六个部分）可以与数千轮的对话历史完美共存。'
            }
        },
        'directChat': {
            'title': '直接聊天法',
            'para1': '为了进行快速测试、一次性会话，或者如果你使用的是免费计划而无法访问 Projects，你可以将 Master Instruction 直接粘贴到新的 Claude 对话中。Claude 会在整个会话期间遵循它，无需设置 Projects。',
            'para2': {
                'before': '工作流程很简单：打开一个新的聊天，将你完整的 Master Instruction 作为',
                'strong1': '第一条消息',
                'mid': '粘贴进去并发送，然后在',
                'strong2': '第二条消息',
                'after': '中发送你的实际请求。Claude 会将第一条消息视为设定上下文的引导，并从那时起在定义的人设和约束下运作。'
            },
            'callout': {
                'title': '仅限会话级别',
                'text': '直接聊天法仅在特定对话的持续时间内有效。如果你开始新的聊天，则需要再次粘贴指令。对于重复使用相同角色，强烈建议使用 Projects 而不是这种方法。'
            }
        },
        'xmlAdvantage': {
            'title': 'XML 的优势',
            'para1': '你生成的指令中的 Section 3（认知循环）使用 XML 标签作为结构化的内部推理脚手架。以下是一个典型的 Cognitive Loop 块的样子，以及 Claude 是如何解释它的：',
            'para2': {
                'before': '当 Claude 读取此块时，它不会在其输出中产生 ',
                'mid': ' XML（除非明确指示这样做）。相反，它使用内部结构作为',
                'strong': '推理模板',
                'after': '——在构建回复之前，将每个子标签作为一个离散的思考步骤执行。结果是，在用户看到任何文字之前，回复就已经根据5分制标准进行了隐含评估、检查了人设一致性，并验证了格式规则。'
            },
            'callout': {
                'title': '添加 <thinking> 标签以显示推理过程',
                'before': '在 Claude 3.5 Sonnet 及更高版本上，你可以在指令中添加 ',
                'mid1': '，使 Claude 在其输出中直观地展示推理链。将此与 Cognitive Loop 结合以实现详细的透明度：',
                'code': '在回答之前，在 <thinking> 标签内展示你的推理过程。',
                'after': ' 这使得 Claude 的评估标准具有可审计性——非常适合高风险决策或教学场景。'
            }
        },
        'apiIntegration': {
            'title': 'API 集成',
            'para1': {
                'before': '对于生产应用程序，请使用 ',
                'strong': 'Anthropic Python SDK',
                'mid': '，将你的 Master Instruction 注入为 ',
                'after': ' 参数。Anthropic 的 API 将系统提示作为一等参数对待——而不是对话数组中的一条消息——这使其在模型的注意力中具有最高优先级。'
            },
            'streaming': {
                'title': '具有扩展思维的流式传输',
                'before': 'Claude 3.7 Sonnet 支持',
                'strong': '扩展思维 (extended thinking)',
                'after': '——这是一种头等 API 功能，可为 Claude 分配专用计算资源，以便在响应之前进行深度推理。这与你的认知循环结合起来非常强大：'
            },
            'callout': {
                'title': '扩展思维的温度限制',
                'before': '使用 Claude 的扩展思维模式时，Anthropic 要求 ',
                'after': '。这不会降低指令遵循度——扩展思维预算提供了结构化的探索，而系统指令中的 Cognitive Loop 提供了指导它的评估标准。'
            }
        },
        'next': '下一步',
        'nextLink': 'Gemini 指南 →'
    },
    'ja': {
        'whyExcels': {
            'title': 'Claude が優れている理由',
            'para1': {
                'before': 'Anthropic は Claude を ',
                'strong1': 'Constitutional AI (CAI)',
                'mid': ' を用いてトレーニングしました。これは、モデルに一連の原則を与え、それらに照らし合わせて自身の出力を批評および修正するよう求めるプロセスです。このトレーニングは、',
                'strong2': 'XML タグ付けされたフィードバックのペア',
                'after': 'を使用して実施されました。モデルは構造化された XML ブロック内で推論過程を提示され、これらのブロックを単なる装飾的なマークアップではなく、最優先の認知的アーティファクトとして扱うことを学びました。'
            },
            'para2': {
                'before': '実際の成果として、Claude は生成された Section 3 の ',
                'mid': ' タグを、',
                'strong': '真の内部推論ディレクティブ',
                'after': 'として処理します。タグ内にある複数の評価基準に従ってから目に見える応答を構築するため、隠された推論レイヤーがユーザーに見える品質を実質的に向上させる二重層の出力が作成されます。'
            },
            'cards': [
                {
                    'label': 'Section 3 — Cognitive Loop',
                    'note': 'ネイティブな推論の足場として処理される XML タグ'
                },
                {
                    'label': 'Section 1 — Role & Identity',
                    'note': 'CAI による強力なペルソナ適応'
                },
                {
                    'label': 'Section 5 — Boundaries',
                    'note': 'CAI トレーニングによる優れた制約の遵守'
                },
                {
                    'label': 'Section 6 — Output Formatting',
                    'note': 'Markdown 構造への強力な準拠'
                }
            ]
        },
        'projects': {
            'title': 'Claude.ai プロジェクト (推奨)',
            'para': {
                'before': 'Claude で Master Instruction を展開する最適な方法は、claude.ai の ',
                'strong1': 'Projects',
                'mid': ' を使用することです。Projects を使用すると、命令に永続的な場所が与えられます。プロジェクト内で開始したすべての会話の先頭に自動的に付加されるため、手動で貼り付ける必要がなくなります。これは、',
                'strong2': '200K トークンのコンテキストウィンドウ',
                'after': ' により、添付されたドキュメントを含むすべての命令履歴が余裕を持って収まるため、Claude で特に強力です。'
            },
            'step1': {
                'title': 'Projects に移動',
                'before': '',
                'mid1': ' に移動してサインインします。',
                'strong': '左側のサイドバー',
                'mid2': 'で、',
                'after': ' をクリックします。表示されない場合は、Pro または Team プランに加入していることを確認してください。Projects には有料アカウントが必要です。'
            },
            'step2': {
                'title': '新しい Project の作成',
                'before': '',
                'mid': ' (または ',
                'after': ' ボタン) をクリックします。「リサーチアナリスト」や「プリンシパルエンジニア」など、説明的な名前を付けます。この名前は、アクティブな命令セットをすばやく識別するのに役立ちます。'
            },
            'step3': {
                'title': 'プロジェクトの指示を追加',
                'before': 'プロジェクトビュー内で、',
                'after': ' をクリックします (右側のパネルまたはプロジェクトページの上部に表示されます)。フルエディターが開くので、ここに Master Instruction 全体を貼り付けます。文字数制限はありません。'
            },
            'step4': {
                'title': '保存して会話を開始',
                'before': '',
                'after': ' をクリックします。このプロジェクト内で開始されたすべての新しい会話は、システムのコンテキストとして Master Instruction を自動的に受け取ります。Claude は、再度貼り付けることなく、セッション全体を通してそれに従います。'
            },
            'callout': {
                'title': 'Projects は指示を永続的に保持します',
                'before': 'チャットの開始時に貼り付けるのとは異なり、Project の指示は',
                'strong': 'サーバー側に無期限に保存',
                'after': 'されます。Project に戻り、指示フィールドを編集することで、いつでも更新できます。Claude の 200K トークンのコンテキストウィンドウは、6 つのセクションすべてを含む完全な指示が、数千ターンの会話履歴と並んで快適に収まることを意味します。'
            }
        },
        'directChat': {
            'title': 'ダイレクトチャット方式',
            'para1': '簡単なテスト、単発のセッションの場合、または Projects にアクセスできない無料プランを使用している場合は、新しい Claude の会話に直接 Master Instruction を貼り付けることができます。Claude はセッション全体にわたってそれに従い、Projects の設定は必要ありません。',
            'para2': {
                'before': 'ワークフローはシンプルです。新しいチャットを開き、Master Instruction 全体を',
                'strong1': '最初のメッセージ',
                'mid': 'として貼り付けて送信し、',
                'strong2': '2 番目のメッセージ',
                'after': 'で実際の要求を送信します。Claude は最初のメッセージをコンテキスト設定のプライマーとして扱い、それ以降は定義されたペルソナと制約内で動作します。'
            },
            'callout': {
                'title': 'セッションスコープのみ',
                'text': 'ダイレクトチャット方式は、その特定の会話の期間中のみ持続します。新しいチャットを開始する場合は、指示を再度貼り付ける必要があります。同じペルソナを繰り返し使用する場合は、この方式よりも Projects を強くお勧めします。'
            }
        },
        'xmlAdvantage': {
            'title': 'XML の優位性',
            'para1': '生成された命令の Section 3 — The Cognitive Loop は、構造化された内部推論の足場として XML タグを使用します。典型的な Cognitive Loop ブロックの様子と、Claude がそれをどのように解釈するかを以下に示します。',
            'para2': {
                'before': 'Claude がこのブロックを読み取るとき、出力に ',
                'mid': ' XML は生成されません (明示的に指示されない限り)。代わりに、内部構造を',
                'strong': '推論テンプレート',
                'after': 'として使用し、応答を構築する前に、個別の思考ステップとして各サブタグを実行します。その結果、ユーザーが単語を目にする前に、5 段階評価のルーブリックに対して暗黙的に評価され、ペルソナの一貫性がチェックされ、フォーマットルールに照らして検証された応答が得られます。'
            },
            'callout': {
                'title': '可視的な推論のための <thinking> タグの追加',
                'before': 'Claude 3.5 Sonnet 以降では、指示に ',
                'mid1': ' を追加して、Claude の推論チェーンを出力に可視化させることができます。これを Cognitive Loop と組み合わせることで、詳細な透明性が得られます：',
                'code': '応答する前に、<thinking> タグ内に推論プロセスを表示してください。',
                'after': ' これにより、Claude の評価基準が監査可能になり、重要な意思決定や教育のコンテキストに最適になります。'
            }
        },
        'apiIntegration': {
            'title': 'API 統合',
            'para1': {
                'before': '本番アプリケーションの場合は、',
                'strong': 'Anthropic Python SDK',
                'mid': ' を使用して、Master Instruction を ',
                'after': ' パラメータとして注入します。Anthropic の API は、システムプロンプトを第一級のパラメータとして扱い（会話配列のメッセージとしてではなく）、モデルの注意において最も高い優先度を与えます。'
            },
            'streaming': {
                'title': 'Extended Thinking を用いたストリーミング',
                'before': 'Claude 3.7 Sonnet は ',
                'strong': 'extended thinking',
                'after': ' をサポートしています。これは、応答前に Claude が深く推論するための専用のコンピュート機能を与える最優先の API 機能です。これは Cognitive Loop と強力に組み合わさります：'
            },
            'callout': {
                'title': 'Extended Thinking の温度制約',
                'before': 'Claude の extended thinking モードを使用する場合、Anthropic は ',
                'after': ' を要求します。これにより指示への準拠が低下することはありません。extended thinking の予算が構造化された探索を提供し、システム指示内の Cognitive Loop がそれを導く評価基準を提供します。'
            }
        },
        'next': '次へ',
        'nextLink': 'Gemini ガイド →'
    },
    'ko': {
        'whyExcels': {
            'title': 'Claude가 뛰어난 이유',
            'para1': {
                'before': 'Anthropic은 ',
                'strong1': 'Constitutional AI (CAI)',
                'mid': '를 사용하여 Claude를 훈련시켰습니다. 모델에 일련의 원칙을 부여하고 그에 대해 자체 출력을 비판하고 수정하도록 요청하는 과정이었습니다. 이 훈련은 ',
                'strong2': 'XML 태그로 표시된 피드백 쌍',
                'after': '을 사용하여 수행되었습니다. 모델은 구조화된 XML 블록 내에서 추론 과정을 보았고, 이러한 블록을 단순한 장식 마크업이 아닌 1급 인지 구성 요소로 다루는 법을 배웠습니다.'
            },
            'para2': {
                'before': '실제 결과로, Claude는 생성된 Section 3의 ',
                'mid': ' 태그를 ',
                'strong': '진정한 내부 추론 지시어',
                'after': '로 처리합니다. 눈에 보이는 응답을 구성하기 전에 태그 내부의 다중 지점 평가 기준을 따릅니다. 결과적으로 숨겨진 추론 레이어가 사용자가 보는 품질을 크게 개선하는 이중 레이어 출력을 만듭니다.'
            },
            'cards': [
                {
                    'label': 'Section 3 — Cognitive Loop',
                    'note': '기본 추론 스캐폴드로 처리되는 XML 태그'
                },
                {
                    'label': 'Section 1 — Role & Identity',
                    'note': 'CAI에 기반한 강력한 페르소나 채택'
                },
                {
                    'label': 'Section 5 — Boundaries',
                    'note': 'CAI 교육을 통한 탁월한 제약 준수'
                },
                {
                    'label': 'Section 6 — Output Formatting',
                    'note': '강력한 Markdown 구조 준수'
                }
            ]
        },
        'projects': {
            'title': 'Claude.ai 프로젝트 (권장)',
            'para': {
                'before': 'Claude에 Master Instruction을 배포하는 가장 좋은 방법은 claude.ai의 ',
                'strong1': 'Projects',
                'mid': '를 이용하는 것입니다. 프로젝트는 명령어에 영구적인 저장소를 제공합니다. 프로젝트 내에서 시작하는 모든 대화의 시작 부분에 자동으로 추가되므로 수동으로 붙여넣을 필요가 없습니다. 이는 ',
                'strong2': '200K 토큰 컨텍스트 창',
                'after': ' 덕분에 첨부된 문서를 포함한 전체 명령 기록이 충분히 들어맞기 때문에 Claude에서 특히 강력합니다.'
            },
            'step1': {
                'title': 'Projects로 이동',
                'before': '',
                'mid1': '로 이동하여 로그인합니다. ',
                'strong': '왼쪽 사이드바',
                'mid2': '에서 ',
                'after': '를 클릭합니다. 보이지 않는 경우 Pro 또는 Team 플랜인지 확인하세요. Projects는 유료 계정이 필요합니다.'
            },
            'step2': {
                'title': '새 프로젝트 생성',
                'before': '',
                'mid': ' (또는 ',
                'after': ' 버튼)을 클릭합니다. "연구 분석가" 또는 "수석 엔지니어"와 같이 설명적인 이름을 지정합니다. 이 이름은 어떤 명령어 세트가 활성 상태인지 빠르게 식별하는 데 도움이 됩니다.'
            },
            'step3': {
                'title': '프로젝트 지침 추가',
                'before': '프로젝트 보기 내에서 ',
                'after': '를 클릭합니다(오른쪽 패널 또는 프로젝트 페이지 상단에 표시됨). 전체 편집기가 열리면 전체 Master Instruction을 여기에 붙여넣습니다. 글자 수 제한은 없습니다.'
            },
            'step4': {
                'title': '저장 및 대화 시작',
                'before': '',
                'after': '를 클릭합니다. 이 프로젝트 내에서 시작된 모든 새 대화는 자동으로 Master Instruction을 시스템 컨텍스트로 받게 됩니다. Claude는 세션 전체에서 다시 붙여넣을 필요 없이 이를 준수합니다.'
            },
            'callout': {
                'title': 'Projects는 명령을 영구적으로 보존합니다',
                'before': '채팅 시작 시 붙여넣는 것과 달리 프로젝트 지침은 ',
                'strong': '서버 측에 무기한 저장',
                'after': '됩니다. 언제든지 프로젝트로 돌아가 지침 필드를 편집하여 업데이트할 수 있습니다. Claude의 200K 토큰 컨텍스트 창은 6개의 섹션을 모두 포함하는 전체 명령이 수천 번의 대화 기록과 함께 편안하게 들어맞음을 의미합니다.'
            }
        },
        'directChat': {
            'title': '직접 채팅 방법',
            'para1': '빠른 테스트, 일회성 세션의 경우 또는 Projects에 액세스할 수 없는 무료 플랜의 경우 새 Claude 대화에 직접 Master Instruction을 붙여넣을 수 있습니다. Claude는 Projects 설정 없이도 세션 내내 이를 준수합니다.',
            'para2': {
                'before': '워크플로우는 간단합니다. 새 채팅을 열고 전체 Master Instruction을 ',
                'strong1': '첫 번째 메시지',
                'mid': '로 붙여넣고 보낸 다음, ',
                'strong2': '두 번째 메시지',
                'after': '에 실제 요청을 보냅니다. Claude는 첫 번째 메시지를 컨텍스트 설정용 프라이머로 취급하며 그 시점부터 정의된 페르소나와 제약 내에서 작동합니다.'
            },
            'callout': {
                'title': '세션 범위로만 제한',
                'text': '직접 채팅 방법은 특정 대화가 지속되는 동안에만 유지됩니다. 새 채팅을 시작하면 명령어를 다시 붙여넣어야 합니다. 같은 페르소나를 반복해서 사용하는 경우 이 방법보다 Projects를 강력히 권장합니다.'
            }
        },
        'xmlAdvantage': {
            'title': 'XML의 이점',
            'para1': '생성된 지침의 Section 3 — The Cognitive Loop는 구조화된 내부 추론 스캐폴드로 XML 태그를 사용합니다. 일반적인 Cognitive Loop 블록의 모습과 Claude가 이를 어떻게 해석하는지는 다음과 같습니다.',
            'para2': {
                'before': 'Claude가 이 블록을 읽을 때 출력에 ',
                'mid': ' XML을 생성하지 않습니다(명시적으로 지시받지 않는 한). 대신 내부 구조를 ',
                'strong': '추론 템플릿',
                'after': '으로 사용하여, 답변을 구성하기 전에 각 하위 태그를 개별 사고 단계로 실행합니다. 결과적으로 사용자가 단어를 보기 전에 암시적으로 5점 기준에 따라 평가되고 페르소나 일관성이 점검되며 서식 규칙에 따라 검증된 답변이 생성됩니다.'
            },
            'callout': {
                'title': '가시적 추론을 위한 <thinking> 태그 추가',
                'before': 'Claude 3.5 Sonnet 이상에서는 지침에 ',
                'mid1': '을 추가하여 Claude의 추론 과정을 출력에 명시적으로 나타낼 수 있습니다. 이를 Cognitive Loop와 결합하여 상세한 투명성을 확보하세요: ',
                'code': '답변하기 전에 <thinking> 태그 내에서 추론 과정을 보여주세요.',
                'after': ' 이를 통해 Claude의 평가 기준을 감사할 수 있게 되어 중요한 의사결정이나 교육 상황에 이상적입니다.'
            }
        },
        'apiIntegration': {
            'title': 'API 통합',
            'para1': {
                'before': '프로덕션 애플리케이션의 경우 ',
                'strong': 'Anthropic Python SDK',
                'mid': '를 사용하여 Master Instruction을 ',
                'after': ' 파라미터로 주입합니다. Anthropic의 API는 시스템 프롬프트를 대화 배열의 메시지가 아닌 1급 파라미터로 취급하여 모델의 주의도에서 가장 높은 우선순위를 부여합니다.'
            },
            'streaming': {
                'title': 'Extended Thinking 스트리밍',
                'before': 'Claude 3.7 Sonnet은 ',
                'strong': 'extended thinking',
                'after': ' 기능을 지원합니다. 답변 전 깊은 추론을 위해 Claude에 전용 컴퓨팅을 제공하는 1급 API 기능으로 Cognitive Loop와 강력하게 결합됩니다:'
            },
            'callout': {
                'title': 'Extended Thinking의 Temperature 제약',
                'before': 'Claude의 extended thinking 모드 사용 시 Anthropic은 ',
                'after': '를 요구합니다. 이로 인해 명령어 준수율이 떨어지지는 않습니다. extended thinking 예산은 구조화된 탐색을 제공하고, 시스템 지침의 Cognitive Loop는 이를 안내하는 평가 기준을 제공합니다.'
            }
        },
        'next': '다음',
        'nextLink': 'Gemini 가이드 →'
    },
    'es': {
        'whyExcels': {
            'title': 'Por qué Claude destaca',
            'para1': {
                'before': 'Anthropic entrenó a Claude usando ',
                'strong1': 'IA Constitucional (CAI)',
                'mid': ' — un proceso en el que al modelo se le dio un conjunto de principios y se le pidió que criticara y revisara sus propios resultados basándose en ellos. Este entrenamiento se llevó a cabo utilizando ',
                'strong2': 'pares de retroalimentación etiquetados con XML',
                'after': ': al modelo se le mostró su razonamiento dentro de bloques XML estructurados y aprendió a tratar esos bloques como artefactos cognitivos de primer nivel, no como marcas decorativas.'
            },
            'para2': {
                'before': 'La consecuencia práctica es que Claude procesa las etiquetas ',
                'mid': ' de la Sección 3 generada como ',
                'strong': 'verdaderas directrices de razonamiento interno',
                'after': '. Seguirá la rúbrica de evaluación de múltiples puntos dentro de las etiquetas antes de construir su respuesta visible, creando una salida de dos capas donde la capa de razonamiento oculto mejora sustancialmente la calidad de lo que el usuario ve.'
            },
            'cards': [
                {
                    'label': 'Sección 3 — Cognitive Loop',
                    'note': 'Etiquetas XML procesadas como andamios de razonamiento nativo'
                },
                {
                    'label': 'Sección 1 — Role & Identity',
                    'note': 'Fuerte adopción de la persona con base constitucional'
                },
                {
                    'label': 'Sección 5 — Boundaries',
                    'note': 'Excelente adherencia a las restricciones gracias al entrenamiento CAI'
                },
                {
                    'label': 'Sección 6 — Output Formatting',
                    'note': 'Fuerte cumplimiento de la estructura Markdown'
                }
            ]
        },
        'projects': {
            'title': 'Proyectos de Claude.ai (Recomendado)',
            'para': {
                'before': 'La mejor manera de desplegar tu Master Instruction con Claude es a través de ',
                'strong1': 'Projects',
                'mid': ' en claude.ai. Los Proyectos le dan a tu instrucción un hogar permanente: se antepone automáticamente a cada conversación que inicies dentro del Proyecto, sin que tengas que pegarla manualmente. Esto es particularmente poderoso con Claude porque su ',
                'strong2': 'ventana de contexto de 200K tokens',
                'after': ' significa que tu historial de instrucciones completo, incluyendo documentos adjuntos, cabe con espacio de sobra.'
            },
            'step1': {
                'title': 'Navega a Proyectos',
                'before': 'Ve a ',
                'mid1': ' e inicia sesión. En la ',
                'strong': 'barra lateral izquierda',
                'mid2': ', haz clic en ',
                'after': '. Si no lo ves, asegúrate de estar en un plan Pro o Team — los Proyectos requieren una cuenta de pago.'
            },
            'step2': {
                'title': 'Crea un Proyecto nuevo',
                'before': 'Haz clic en ',
                'mid': ' (o el botón ',
                'after': '). Dale un nombre descriptivo — p. ej., "Analista de Investigación" o "Ingeniero Principal". Este nombre te ayudará a identificar rápidamente qué conjunto de instrucciones está activo.'
            },
            'step3': {
                'title': 'Añade instrucciones al proyecto',
                'before': 'Dentro de la vista del Proyecto, haz clic en ',
                'after': ' (visible en el panel derecho o en la parte superior de la página del Proyecto). Se abre un editor completo — pega tu Master Instruction completa aquí. No hay límite de caracteres.'
            },
            'step4': {
                'title': 'Guarda e inicia una conversación',
                'before': 'Haz clic en ',
                'after': '. Cada nueva conversación iniciada dentro de este Proyecto recibirá automáticamente tu Master Instruction como su contexto del sistema. Claude lo respetará durante toda la sesión sin tener que volver a pegarlo.'
            },
            'callout': {
                'title': 'Los Proyectos conservan las instrucciones permanentemente',
                'before': 'A diferencia de pegar al principio de un chat, las instrucciones del Proyecto se ',
                'strong': 'almacenan del lado del servidor indefinidamente',
                'after': '. Puedes actualizarlas en cualquier momento volviendo al Proyecto y editando el campo de instrucciones. La ventana de contexto de 200K tokens de Claude significa que tu instrucción completa (incluyendo las seis secciones) cabe cómodamente junto a miles de turnos de historial de conversación.'
            }
        },
        'directChat': {
            'title': 'Método de chat directo',
            'para1': 'Para pruebas rápidas, sesiones puntuales o si estás en el plan gratuito sin acceso a Proyectos, puedes pegar la Master Instruction directamente en una nueva conversación de Claude. Claude la respetará durante toda la sesión, sin necesidad de configurar un Proyecto.',
            'para2': {
                'before': 'El flujo de trabajo es simple: abre un nuevo chat, pega tu Master Instruction completa como tu ',
                'strong1': 'primer mensaje',
                'mid': ', envíalo y luego en tu ',
                'strong2': 'segundo mensaje',
                'after': ' envía tu solicitud real. Claude tratará el primer mensaje como una introducción que establece el contexto y operará dentro de la persona y las restricciones definidas a partir de ese momento.'
            },
            'callout': {
                'title': 'Solo válido para la sesión',
                'text': 'El método de chat directo solo persiste durante la duración de esa conversación específica. Si inicias un nuevo chat, tendrás que pegar la instrucción nuevamente. Para un uso repetido de la misma persona, se recomiendan encarecidamente los Proyectos en lugar de este método.'
            }
        },
        'xmlAdvantage': {
            'title': 'La ventaja de XML',
            'para1': 'La Sección 3 de tu instrucción generada — El Cognitive Loop — utiliza etiquetas XML como un andamiaje de razonamiento interno estructurado. Así es como se ve un bloque típico de Cognitive Loop y cómo lo interpreta Claude:',
            'para2': {
                'before': 'Cuando Claude lee este bloque, no produce el código XML ',
                'mid': ' en su salida (a menos que se le indique explícitamente). En su lugar, usa la estructura interna como una ',
                'strong': 'plantilla de razonamiento',
                'after': ' — ejecutando cada subetiqueta como un paso de pensamiento discreto antes de construir su respuesta. El resultado es una respuesta que ha sido evaluada implícitamente contra una rúbrica de 5 puntos, comprobada por la coherencia de la persona y verificada contra las reglas de formato — todo antes de que el usuario vea una sola palabra.'
            },
            'callout': {
                'title': 'Añade etiquetas <thinking> para mostrar el razonamiento',
                'before': 'En Claude 3.5 Sonnet y posteriores, puedes añadir ',
                'mid1': ' a tu instrucción para exponer la cadena de razonamiento de Claude visiblemente en su salida. Combina esto con el Cognitive Loop para una transparencia detallada: ',
                'code': 'Antes de responder, muestra tu razonamiento dentro de las etiquetas <thinking>.',
                'after': ' Esto hace que la rúbrica de evaluación de Claude sea auditable — ideal para decisiones de alto riesgo o contextos de enseñanza.'
            }
        },
        'apiIntegration': {
            'title': 'Integración API',
            'para1': {
                'before': 'Para aplicaciones de producción, utiliza el ',
                'strong': 'SDK de Python de Anthropic',
                'mid': ' para inyectar tu Master Instruction como el parámetro ',
                'after': '. La API de Anthropic trata el mensaje del sistema como un parámetro de primera clase (no como un mensaje en el array de la conversación), lo que le da la más alta prioridad en la atención del modelo.'
            },
            'streaming': {
                'title': 'Streaming con Extended Thinking',
                'before': 'Claude 3.7 Sonnet soporta ',
                'strong': 'extended thinking (pensamiento extendido)',
                'after': ' — una característica API de primer nivel que otorga a Claude cómputo dedicado para un razonamiento profundo antes de responder. Esto se combina poderosamente con tu Cognitive Loop:'
            },
            'callout': {
                'title': 'Restricción de temperatura para Extended Thinking',
                'before': 'Cuando uses el modo extended thinking de Claude, Anthropic requiere ',
                'after': '. Esto no reduce la adherencia a la instrucción: el presupuesto de extended thinking proporciona exploración estructurada, y el Cognitive Loop en tu instrucción del sistema proporciona la rúbrica de evaluación que la guía.'
            }
        },
        'next': 'Siguiente',
        'nextLink': 'Guía de Gemini →'
    },
    'id': {
        'whyExcels': {
            'title': 'Mengapa Claude Unggul',
            'para1': {
                'before': 'Anthropic melatih Claude menggunakan ',
                'strong1': 'Constitutional AI (CAI)',
                'mid': ' — sebuah proses di mana model diberi serangkaian prinsip dan diminta untuk mengkritik serta merevisi outputnya sendiri berdasarkan prinsip-prinsip tersebut. Pelatihan ini dilakukan menggunakan ',
                'strong2': 'pasangan umpan balik ber-tag XML',
                'after': ': model ditunjukkan alasannya di dalam blok XML terstruktur dan belajar untuk memperlakukan blok tersebut sebagai artefak kognitif kelas satu, bukan sekadar markup dekoratif.'
            },
            'para2': {
                'before': 'Konsekuensi praktisnya adalah Claude memproses tag ',
                'mid': ' pada Bagian 3 yang dihasilkan sebagai ',
                'strong': 'arahan penalaran internal yang sesungguhnya',
                'after': '. Claude akan mengikuti rubrik evaluasi multi-poin di dalam tag sebelum menyusun respons yang terlihat — menciptakan output dua lapis di mana lapisan penalaran tersembunyi secara material meningkatkan kualitas apa yang dilihat pengguna.'
            },
            'cards': [
                {
                    'label': 'Section 3 — Cognitive Loop',
                    'note': 'Tag XML diproses sebagai perancah penalaran asli'
                },
                {
                    'label': 'Section 1 — Role & Identity',
                    'note': 'Adopsi persona yang kuat dengan landasan konstitusional'
                },
                {
                    'label': 'Section 5 — Boundaries',
                    'note': 'Kepatuhan pada batasan yang sangat baik dari pelatihan CAI'
                },
                {
                    'label': 'Section 6 — Output Formatting',
                    'note': 'Kepatuhan yang kuat terhadap struktur Markdown'
                }
            ]
        },
        'projects': {
            'title': 'Proyek Claude.ai (Direkomendasikan)',
            'para': {
                'before': 'Cara terbaik untuk menerapkan Master Instruction Anda dengan Claude adalah melalui ',
                'strong1': 'Projects',
                'mid': ' di claude.ai. Projects memberikan rumah permanen bagi instruksi Anda — instruksi ini secara otomatis ditambahkan ke setiap percakapan yang Anda mulai di dalam Proyek, tanpa Anda harus menempelkannya (paste) secara manual. Ini sangat kuat bersama Claude karena ',
                'strong2': '200K-token context window',
                'after': ' berarti seluruh riwayat instruksi Anda, termasuk dokumen yang dilampirkan, muat dan masih menyisakan banyak ruang.'
            },
            'step1': {
                'title': 'Navigasi ke Projects',
                'before': 'Buka ',
                'mid1': ' dan masuk (sign in). Di ',
                'strong': 'bilah sisi kiri',
                'mid2': ', klik ',
                'after': '. Jika Anda tidak melihatnya, pastikan Anda berada di paket Pro atau Team — Projects memerlukan akun berbayar.'
            },
            'step2': {
                'title': 'Buat Project baru',
                'before': 'Klik ',
                'mid': ' (atau tombol ',
                'after': '). Beri nama deskriptif — mis., "Analis Riset" atau "Insinyur Utama". Nama ini membantu Anda mengidentifikasi dengan cepat kumpulan instruksi mana yang aktif.'
            },
            'step3': {
                'title': 'Tambahkan instruksi proyek',
                'before': 'Di dalam tampilan Proyek, klik ',
                'after': ' (terlihat di panel sebelah kanan atau di bagian atas halaman Proyek). Editor penuh terbuka — tempel Master Instruction lengkap Anda di sini. Tidak ada batasan karakter.'
            },
            'step4': {
                'title': 'Simpan dan mulai percakapan',
                'before': 'Klik ',
                'after': '. Setiap percakapan baru yang dimulai di dalam Proyek ini akan secara otomatis menerima Master Instruction Anda sebagai konteks sistemnya. Claude akan menghormatinya selama seluruh sesi tanpa perlu menempelkan ulang.'
            },
            'callout': {
                'title': 'Projects Mempertahankan Instruksi Secara Permanen',
                'before': 'Tidak seperti menempelkan di awal obrolan, instruksi Proyek ',
                'strong': 'disimpan di sisi server tanpa batas waktu',
                'after': '. Anda dapat memperbaruinya kapan saja dengan kembali ke Proyek dan mengedit bidang instruksi. 200K-token context window dari Claude berarti seluruh instruksi Anda — termasuk keenam bagian — muat dengan nyaman bersama ribuan giliran riwayat percakapan.'
            }
        },
        'directChat': {
            'title': 'Metode Obrolan Langsung',
            'para1': 'Untuk pengujian cepat, sesi satu kali, atau jika Anda menggunakan paket gratis tanpa akses ke Projects, Anda dapat menempelkan Master Instruction langsung ke percakapan Claude yang baru. Claude akan menghormatinya selama seluruh sesi, tidak diperlukan penyiapan Projects.',
            'para2': {
                'before': 'Alur kerjanya sederhana: buka obrolan baru, tempel Master Instruction lengkap Anda sebagai ',
                'strong1': 'pesan pertama',
                'mid': ', kirimkan, lalu di ',
                'strong2': 'pesan kedua',
                'after': ' Anda, kirim permintaan Anda yang sebenarnya. Claude memperlakukan pesan pertama sebagai pengatur konteks dan akan beroperasi dalam persona dan batasan yang ditentukan sejak saat itu.'
            },
            'callout': {
                'title': 'Hanya Berlingkup Sesi',
                'text': 'Metode obrolan langsung hanya bertahan selama percakapan spesifik tersebut. Jika Anda memulai obrolan baru, Anda harus menempelkan instruksinya lagi. Untuk penggunaan persona yang sama secara berulang, Projects sangat disarankan daripada metode ini.'
            }
        },
        'xmlAdvantage': {
            'title': 'Keunggulan XML',
            'para1': 'Bagian 3 dari instruksi yang Anda hasilkan — The Cognitive Loop — menggunakan tag XML sebagai perancah penalaran internal terstruktur. Berikut adalah seperti apa blok Cognitive Loop pada umumnya dan bagaimana Claude menafsirkannya:',
            'para2': {
                'before': 'Saat Claude membaca blok ini, ia tidak menghasilkan XML ',
                'mid': ' pada outputnya (kecuali diinstruksikan secara eksplisit). Alih-alih, ia menggunakan struktur internal sebagai ',
                'strong': 'templat penalaran',
                'after': ' — menjalankan setiap sub-tag sebagai langkah pemikiran terpisah sebelum menyusun jawabannya. Hasilnya adalah respons yang telah dievaluasi secara implisit terhadap rubrik 5 poin, diperiksa konsistensi personanya, dan diverifikasi terhadap aturan pemformatan — semuanya sebelum pengguna melihat satu kata pun.'
            },
            'callout': {
                'title': 'Tambahkan Tag <thinking> untuk Penalaran yang Terlihat',
                'before': 'Pada Claude 3.5 Sonnet dan yang lebih baru, Anda dapat menambahkan ',
                'mid1': ' ke instruksi Anda untuk memperlihatkan rantai penalaran Claude secara jelas pada outputnya. Gabungkan ini dengan Cognitive Loop untuk transparansi terperinci: ',
                'code': 'Sebelum merespons, tunjukkan penalaran Anda di dalam tag <thinking>.',
                'after': ' Ini membuat rubrik evaluasi Claude dapat diaudit — ideal untuk keputusan berisiko tinggi atau konteks pengajaran.'
            }
        },
        'apiIntegration': {
            'title': 'Integrasi API',
            'para1': {
                'before': 'Untuk aplikasi produksi, gunakan ',
                'strong': 'Anthropic Python SDK',
                'mid': ' untuk menyuntikkan Master Instruction Anda sebagai parameter ',
                'after': '. API Anthropic memperlakukan prompt sistem sebagai parameter kelas satu — bukan pesan dalam larik percakapan — yang memberikannya prioritas tertinggi di perhatian model.'
            },
            'streaming': {
                'title': 'Streaming dengan Extended Thinking',
                'before': 'Claude 3.7 Sonnet mendukung ',
                'strong': 'extended thinking',
                'after': ' — fitur API kelas utama yang memberikan komputasi khusus untuk Claude agar bisa menalar secara mendalam sebelum merespons. Ini berpadu secara kuat dengan Cognitive Loop Anda:'
            },
            'callout': {
                'title': 'Kendala Suhu (Temperature) untuk Extended Thinking',
                'before': 'Saat menggunakan mode extended thinking Claude, Anthropic mewajibkan ',
                'after': '. Ini tidak mengurangi kepatuhan pada instruksi — anggaran extended thinking memberikan eksplorasi terstruktur, dan Cognitive Loop dalam instruksi sistem Anda memberikan rubrik evaluasi yang memandunya.'
            }
        },
        'next': 'Selanjutnya',
        'nextLink': 'Panduan Gemini →'
    }
}

for locale, translation in locales.items():
    filepath = os.path.join(r"c:\Users\Admin\Desktop\Others\AI CIs Generator\ai-cis-generator\src\i18n\locales", locale, "docs.json")
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)

    if 'claude' not in data:
        data['claude'] = {}
    
    data['claude'].update(translation)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("JSON files updated successfully.")
