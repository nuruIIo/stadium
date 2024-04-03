import { Action, Command, Ctx, Hears, On, Start, Update } from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    this.botService.start(ctx)
  }

  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    this.botService.onContact(ctx)
  }

  // @On('photo')
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ('photo' in ctx.message) {
  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id),
  //     );
  //   }
  // }

  // @On('video')
  // async onVideo(@Ctx() ctx: Context) {
  //   if ('video' in ctx.message) {
  //     await ctx.reply(String(ctx.message.video.file_name));
  //   }
  // }

  // @On('sticker')
  // async onSticker(@Ctx() ctx: Context) {
  //   if ('sticker' in ctx.message) {
  //     await ctx.reply('😷');
  //   }
  // }

  // @On('animation')
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ('animation' in ctx.message) {
  //     await ctx.reply('Animate');
  //   }
  // }

  // @On('contact')
  // async onContact(@Ctx() ctx: Context) {
  //   if ('contact' in ctx.message) {
  //     await ctx.reply(String(ctx.message.contact.phone_number));
  //   }
  // }

  // @On('location')
  // async onLocation(@Ctx() ctx: Context) {
  //   if ('location' in ctx.message) {
  //     await ctx.replyWithLocation(
  //       ctx.message.location.latitude,
  //       ctx.message.location.latitude,
  //     );
  //   }
  // }

  // @On('voice')
  // async onVoice(@Ctx() ctx: Context) {
  //   if ('voice' in ctx.message) {
  //     await ctx.reply(String(ctx.message.voice.duration));
  //   }
  // }

  // @On('invoice')
  // async onInvoice(@Ctx() ctx: Context) {
  //   if ('invoice' in ctx.message) {
  //     await ctx.reply(String(ctx.message.invoice.title));
  //   }
  // }

  // @On('document')
  // async onDocument(@Ctx() ctx: Context) {
  //   if ('document' in ctx.message) {
  //     await ctx.reply(String(ctx.message.document.file_name));
  //   }
  // }

  // @Hears('hi')
  // async hearsHi(@Ctx() ctx: Context) {
  //   await ctx.reply(String('hay hay'));
  // }

  // @Command('help')
  // async helpCommand(@Ctx() ctx: Context) {
  //   await ctx.reply('how can i help you?');
  // }

  // @Command('language')
  // async langugeCommand(@Ctx() ctx: Context) {
  //   await ctx.reply('please choose one language: Russian | English');
  // }

  // @Command('inline_keyboard')
  // async inlineButton(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     [
  //       {
  //         text: 'Button 1',
  //         callback_data: 'button1',
  //       },
  //       {
  //         text: 'Button 2',
  //         callback_data: 'button2',
  //       },
  //       {
  //         text: 'Button 3',
  //         callback_data: 'button3',
  //       },
  //     ],
  //     [
  //       {
  //         text: 'Button 4',
  //         callback_data: 'button4',
  //       },
  //     ],
  //     [
  //       {
  //         text: 'Button 5',
  //         callback_data: 'button5',
  //       },
  //     ],
  //   ];
  //   await ctx.reply('Inline buttonni tanla:', {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }

  // @Action('button1')
  // async onActionButton1(@Ctx() ctx: Context) {
  //   await ctx.reply('Button1 clicked');
  // }

  // @Action('button2')
  // async onActionButton2(@Ctx() ctx: Context) {
  //   await ctx.reply('Button2 clicked');
  // }

  // @Action(/button+[1-9]/)
  // async onActionAnyButton(@Ctx() ctx: Context) {
  //   await ctx.reply('Button clicked');
  // }

  // @Command('main_keyboard')
  // async MainButton(@Ctx() ctx: Context) {
  //   await ctx.reply('choose main button:', {
  //     parse_mode: 'HTML',
  //     ...Markup.keyboard([
  //       ['one', 'two', 'three'], ["four"], [Markup.button.contactRequest('please send your number')]
  //     ]).resize().oneTime()
  //   });
  // }

  // @Hears('one')
  // async hearsOne(@Ctx() ctx: Context) {
  //   await ctx.reply('hearing one')
  // }


  // @On('text')
  // async onText(@Ctx() ctx: Context) {
  //   if ('text' in ctx.message) {
  //     if (ctx.message.text == 'hello') {
  //       await ctx.replyWithHTML('<b> hello </b>');
  //     } else {
  //       await ctx.replyWithHTML(ctx.message.text);
  //     }
  //   }
  // }

  // @On('message')
  // async onMessage(@Ctx() ctx: Context) {
  //   console.log('botInfo', ctx.botInfo);
  //   console.log('chat', ctx.chat);
  //   console.log('chatId', ctx.chat.id);
  // }
}