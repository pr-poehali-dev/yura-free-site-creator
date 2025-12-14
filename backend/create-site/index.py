import json
import os
import psycopg2
from typing import Dict, Any
from dataclasses import dataclass

@dataclass
class CreateSiteRequest:
    user_session: str
    project_name: str
    description: str

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Создаёт новый проект сайта для пользователя
    Args: event - содержит httpMethod, body с project_name, description, user_session
          context - объект с request_id, function_name
    Returns: JSON с project_id и статусом создания
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        user_session = body_data.get('user_session')
        project_name = body_data.get('project_name')
        description = body_data.get('description', '')
        
        if not user_session or not project_name:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'user_session and project_name required'}),
                'isBase64Encoded': False
            }
        
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute(
            '''INSERT INTO projects (user_session, project_name, description, status, poehali_url)
               VALUES (%s, %s, %s, %s, %s)
               RETURNING id''',
            (user_session, project_name, description, 'ready', f'https://project-{user_session[:8]}.poehali.dev')
        )
        
        project_id = cur.fetchone()[0]
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'project_id': project_id,
                'status': 'ready',
                'message': 'Сайт успешно создан!',
                'url': f'https://project-{user_session[:8]}.poehali.dev'
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
